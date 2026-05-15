
// import { useState } from "react";

// const APP_KEYWORDS = [
//   "dashboard",
//   "job",
//   "jobs",
//   "candidate",
//   "candidates",
//   "report",
//   "reports",
//   "meeting",
//   "meetings",
//   "onboarding",
//   "login",
//   "logout",
//   "recruiflow",
// ];

// const INITIAL_MESSAGE = [
//   {
//     from: "bot",
//     text: "👋 Hi, I’m Natasha. How can I help you with this application?",
//   },
// ];

// export default function NatashaBot() {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState(INITIAL_MESSAGE);

//   const handleClose = () => {
//     setOpen(false);
//     setInput("");
//     setMessages(INITIAL_MESSAGE); // ✅ CLEAR CHAT ON CLOSE
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userText = input;
//     setInput("");

//     setMessages((prev) => [...prev, { from: "user", text: userText }]);

//     const isAppQuestion = APP_KEYWORDS.some((key) =>
//       userText.toLowerCase().includes(key)
//     );

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           from: "bot",
//           text: isAppQuestion
//             ? "✅ I can help with that. Please navigate to the relevant section in RecruiFlow or tell me what you want to do."
//             : "❌ I can help only with RecruiFlow features such as Jobs, Candidates, Reports, and Onboarding.",
//         },
//       ]);
//     }, 400);
//   };

//   return (
//     <>
//       {/* ✅ BOT ICON (hidden when chat is open) */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           title="Natasha AI"
//           className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-blue-600 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition"
//         >
//           {/* Modern SVG Bot Icon */}
//           <svg
//             width="28"
//             height="28"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M12 2v4" />
//             <rect x="4" y="6" width="16" height="14" rx="6" />
//             <path d="M9 13h.01M15 13h.01" />
//           </svg>
//         </button>
//       )}

//       {/* ✅ RIGHT CHAT SIDEBAR */}
//       {open && (
//         <div className="fixed inset-0 z-[9998] flex justify-end">
//           {/* Overlay */}
//           <div className="flex-1 bg-black/40" onClick={handleClose} />

//           {/* Sidebar */}
//           <div className="w-[380px] bg-white shadow-2xl flex flex-col">
//             {/* Header */}
//             <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//               <span className="font-semibold text-lg">Natasha AI</span>
//               <button className="text-xl" onClick={handleClose}>
//                 ✕
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-4 bg-blue-50 overflow-y-auto space-y-3">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`max-w-[85%] p-3 rounded-lg shadow text-sm ${
//                     msg.from === "bot"
//                       ? "bg-white"
//                       : "bg-blue-600 text-white ml-auto"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t flex gap-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your message..."
//                 className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-blue-600 text-white px-4 rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// import { useState, useEffect } from "react";

// const APP_KEYWORDS = [
//   "dashboard",
//   "job",
//   "jobs",
//   "candidate",
//   "candidates",
//   "report",
//   "reports",
//   "meeting",
//   "meetings",
//   "onboarding",
//   "login",
//   "logout",
//   "recruiflow",
// ];

// const INITIAL_MESSAGE = [
//   {
//     from: "bot",
//     text: "👋 Hi, I’m Natasha. How can I help you with this application?",
//   },
// ];

// export default function NatashaBot() {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState(INITIAL_MESSAGE);
//   const [spoken, setSpoken] = useState(false);

//   // ✅ Speak when chat opens (only once)
//   useEffect(() => {
//     if (open && !spoken && "speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(
//         "Hi, I’m Natasha. How can I help you with this application?"
//       );
//       utterance.rate = 1;
//       utterance.pitch = 1.1;
//       utterance.lang = "en-US";

//       window.speechSynthesis.speak(utterance);
//       setSpoken(true);
//     }
//   }, [open, spoken]);

//   const handleClose = () => {
//     setOpen(false);
//     setInput("");
//     setMessages(INITIAL_MESSAGE);
//     setSpoken(false);
//     window.speechSynthesis.cancel(); // ✅ stop voice on close
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userText = input;
//     setInput("");
//     setMessages((prev) => [...prev, { from: "user", text: userText }]);

//     const isAppRelated = APP_KEYWORDS.some((k) =>
//       userText.toLowerCase().includes(k)
//     );

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           from: "bot",
//           text: isAppRelated
//             ? "✅ I can help with that. Please navigate to the relevant section in RecruiFlow or tell me what you want to do."
//             : "❌ I can help only with RecruiFlow features like Jobs, Candidates, Reports, and Onboarding.",
//         },
//       ]);
//     }, 400);
//   };

//   return (
//     <>
//       {/* ✅ BOT ICON (modern icon, no image) */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           title="Natasha AI"
//           className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-blue-600 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition"
//         >
//           <svg
//             width="28"
//             height="28"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M12 2v4" />
//             <rect x="4" y="6" width="16" height="14" rx="6" />
//             <path d="M9 13h.01M15 13h.01" />
//           </svg>
//         </button>
//       )}

//       {/* ✅ CHAT SIDEBAR */}
//       {open && (
//         <div className="fixed inset-0 z-[9998] flex justify-end">
//           <div className="flex-1 bg-black/40" onClick={handleClose} />

//           <div className="w-[380px] bg-white shadow-2xl flex flex-col">
//             {/* Header */}
//             <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//               <span className="font-semibold text-lg">Natasha AI</span>
//               <button className="text-xl" onClick={handleClose}>
//                 ✕
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 p-4 bg-blue-50 overflow-y-auto space-y-3">
//               {messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`max-w-[85%] p-3 rounded-lg shadow text-sm ${
//                     m.from === "bot"
//                       ? "bg-white"
//                       : "bg-blue-600 text-white ml-auto"
//                   }`}
//                 >
//                   {m.text}
//                 </div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t flex gap-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your message..."
//                 className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-blue-600 text-white px-4 rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import { useState, useEffect } from "react";

/* ✅ Keywords allowed — app-related only */
const APP_KEYWORDS = [
  "dashboard",
  "job",
  "jobs",
  "candidate",
  "candidates",
  "report",
  "reports",
  "meeting",
  "meetings",
  "onboarding",
  "login",
  "logout",
  "recruiflow",
];

/* ✅ Initial greeting */
const INITIAL_MESSAGE = [
  {
    from: "bot",
    text: "👋 Hi, I’m Natasha. How can I help you with this application?",
  },
];

/* ✅ Female voice speaker */
function speakWithFemaleVoice(text) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  const speak = () => {
    const voices = synth.getVoices();

    const femaleVoice =
      voices.find((v) =>
        /female|woman|girl|jenny|aria|samantha|samantha/i.test(v.name)
      ) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = femaleVoice;
    utterance.rate = 0.95;   // soft & natural
    utterance.pitch = 1.2;   // feminine tone
    utterance.volume = 1;

    synth.speak(utterance);
  };

  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = speak;
  } else {
    speak();
  }
}

export default function NatashaBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGE);
  const [spoken, setSpoken] = useState(false);

  /* ✅ Speak greeting when opened */
  useEffect(() => {
    if (open && !spoken) {
      speakWithFemaleVoice(
        "Hi, I’m Natasha. How can I help you with this application?"
      );
      setSpoken(true);
    }
  }, [open, spoken]);

  /* ✅ Close chat & clear everything */
  const handleClose = () => {
    window.speechSynthesis.cancel();
    setOpen(false);
    setInput("");
    setMessages(INITIAL_MESSAGE);
    setSpoken(false);
  };

  /* ✅ Send message */
  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: userText }]);

    const isAppRelated = APP_KEYWORDS.some((key) =>
      userText.toLowerCase().includes(key)
    );

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: isAppRelated
            ? "✅ I can help with that. Please navigate to the related section in RecruiFlow or tell me what you want to do."
            : "❌ I can help only with RecruiFlow features like Jobs, Candidates, Reports, and Onboarding.",
        },
      ]);
    }, 400);
  };

  return (
    <>
      {/* ✅ BOT ICON (hidden when chat opens) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Natasha AI"
          className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-blue-600 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition"
        >
          {/* Modern Chatbot Icon (SVG) */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4" />
            <rect x="4" y="6" width="16" height="14" rx="6" />
            <path d="M9 13h.01M15 13h.01" />
          </svg>
        </button>
      )}

      {/* ✅ RIGHT CHAT SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-[9998] flex justify-end">
          {/* Overlay */}
          <div className="flex-1 bg-black/40" onClick={handleClose} />

          {/* Chat Panel */}
          <div className="w-[380px] bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold text-lg">Natasha AI</span>
              <button className="text-xl" onClick={handleClose}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 bg-blue-50 overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] p-3 rounded-lg shadow text-sm ${
                    msg.from === "bot"
                      ? "bg-white"
                      : "bg-blue-600 text-white ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}