import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";

const apiKey = "AIzaSyD5Dh4bB5elL1IlRevbb9x0asvE55w9anY"; // replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

const Chatbot = () => {
  const navigate = useNavigate();  // <-- here
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(chats);
    });
    return () => unsubscribe();
  }, []);

  const loadChat = (id) => {
    setChatId(id);
    const chatRef = collection(db, "chats");
    const q = query(chatRef, where("__name__", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const chatData = querySnapshot.docs[0].data();
        setMessages(chatData.messages || []);
      }
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMsg = { sender: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    try {
      const result = await model.generateContent([input]);
      const botResponse = result.response.text();

      const botMsg = { sender: "bot", text: botResponse };
      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);

      if (!chatId) {
        const docRef = await addDoc(collection(db, "chats"), {
          messages: finalMessages,
          createdAt: serverTimestamp(),
        });
        setChatId(docRef.id);
      } else {
        await addDoc(collection(db, `chats/${chatId}/updates`), {
          messages: finalMessages,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = { sender: "bot", text: "Sorry, something went wrong." };
      setMessages(prev => [...prev, errorMsg]);
    }
    setLoading(false);
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sidebar: {
      width: 280,
      backgroundColor: "#121212",
      color: "#eee",
      display: "flex",
      flexDirection: "column",
      padding: 16,
      overflowY: "auto",
    },
    chatHistoryItem: {
      padding: 12,
      marginBottom: 8,
      borderRadius: 6,
      cursor: "pointer",
      backgroundColor: "#1f1f1f",
      userSelect: "none",
    },
    mainChat: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#222",
      color: "#eee",
      padding: 16,
    },
    messagesContainer: {
      flexGrow: 1,
      overflowY: "auto",
      marginBottom: 12,
      paddingRight: 8,
    },
    messageUser: {
      backgroundColor: "#3a86ff",
      color: "#fff",
      alignSelf: "flex-end",
      padding: "8px 14px",
      borderRadius: "18px 18px 0 18px",
      maxWidth: "75%",
      marginBottom: 8,
      wordWrap: "break-word",
    },
    messageBot: {
      backgroundColor: "#4a4a4a",
      color: "#eee",
      alignSelf: "flex-start",
      padding: "8px 14px",
      borderRadius: "18px 18px 18px 0",
      maxWidth: "75%",
      marginBottom: 8,
      wordWrap: "break-word",
    },
    inputArea: {
      display: "flex",
      gap: 8,
    },
    input: {
      flexGrow: 1,
      padding: 10,
      borderRadius: 20,
      border: "none",
      fontSize: 16,
      outline: "none",
    },
    sendButton: {
      backgroundColor: "#3a86ff",
      border: "none",
      color: "white",
      fontWeight: "bold",
      borderRadius: 20,
      padding: "10px 16px",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.6 : 1,
    },
    backButton: {
      marginBottom: 12,
      backgroundColor: "#555",
      border: "none",
      color: "#eee",
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
      alignSelf: "flex-start",
    },
    sidebarMsgSnippet: {
      fontWeight: "bold",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    sidebarTimestamp: {
      fontSize: 12,
      color: "#999",
      marginTop: 4,
    },
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={{ marginBottom: 16 }}>Chat History</h2>
        {history.length === 0 && <div>No chats yet</div>}
        {history.map((chat) => {
          const firstUserMsg = chat.messages?.find(m => m.sender === "user")?.text || "New Chat";

          return (
            <div
              key={chat.id}
              style={styles.chatHistoryItem}
              onClick={() => loadChat(chat.id)}
              title={chat.createdAt?.toDate().toLocaleString()}
            >
              <div style={styles.sidebarMsgSnippet}>{firstUserMsg}</div>
              <div style={styles.sidebarTimestamp}>
                {chat.createdAt ? chat.createdAt.toDate().toLocaleString() : "Unknown date"}
              </div>
            </div>
          );
        })}
      </aside>

      <main style={styles.mainChat}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/")}
        >
          ← Back to Dashboard
        </button>

        <div style={styles.messagesContainer} id="messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={msg.sender === "user" ? styles.messageUser : styles.messageBot}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={styles.input}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            style={styles.sendButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
