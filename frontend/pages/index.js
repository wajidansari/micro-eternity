import { useState } from 'react';

export default function Home() {
  return <h1>Welcome to Micro Eternity</h1>;
}

  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatLog([...chatLog, { sender: "user", message: userMessage }]);
    setChatInput("");
    
    // Call Next.js API route to proxy chat to backend
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setChatLog((prev) => [...prev, { sender: "ai", message: data.response }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-8">Micro Eternity BI Dashboard</h1>
      <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Chat window */}
        <div className="h-64 overflow-y-auto p-2 mb-4 bg-gray-700 rounded">
          {chatLog.map((entry, idx) => (
            <div key={idx} className={`mb-2 ${entry.sender === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block p-2 rounded ${entry.sender === "user" ? "bg-blue-600" : "bg-green-600"}`}>
                {entry.message}
              </span>
            </div>
          ))}
        </div>
        {/* Input area */}
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 rounded-l bg-gray-600"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about sales reports..."
          />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 p-2 rounded-r">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
