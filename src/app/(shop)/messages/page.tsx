"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Send, CheckCheck, X, MessageSquare } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

// High-fidelity SVG matching the tie-dye circular avatar in the screenshot
const ADMIN_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="g1" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="35%" stop-color="#ec4899"/>
      <stop offset="70%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </radialGradient>
    <radialGradient id="g2" cx="70%" cy="70%" r="60%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#f43f5e" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.9"/>
    </radialGradient>
    <filter id="f">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <rect width="100" height="100" fill="url(#g1)"/>
  <circle cx="50" cy="50" r="45" fill="url(#g2)" filter="url(#f)"/>
</svg>
`)}`;

interface MessageItem {
  id: string;
  sender: "user" | "other";
  text: string;
  time: string;
}

interface Chat {
  id: string;
  user: string;
  avatar: string;
  subject: string;
  time: string;
  messages: MessageItem[];
}

export default function MessagesPage() {
  const { userProfile } = useAppContext();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Summer fashion top lace",
      time: "3 days ago",
      messages: [
        {
          id: "m1",
          sender: "other",
          text: "Hi, I have a question regarding 'Summer fashion top lace'. Is it available in size M and L?",
          time: "3 days ago",
        },
        {
          id: "m2",
          sender: "user",
          text: "Hello! Yes, both size M and L are currently in stock and ready to ship.",
          time: "3 days ago",
        },
      ],
    },
    {
      id: "2",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Black fashion women backpack",
      time: "12 days ago",
      messages: [
        {
          id: "m3",
          sender: "other",
          text: "Could you confirm the waterproof material specifications for the Black fashion women backpack?",
          time: "12 days ago",
        },
        {
          id: "m4",
          sender: "user",
          text: "Yes, it is made of water-resistant nylon fabric with reinforced stitching.",
          time: "12 days ago",
        },
      ],
    },
    {
      id: "3",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Sun hat for women protection cap",
      time: "22 days ago",
      messages: [
        {
          id: "m5",
          sender: "other",
          text: "Hi, does this sun hat fold easily for travel without losing shape?",
          time: "22 days ago",
        },
        {
          id: "m6",
          sender: "user",
          text: "Yes, it is rollable and specifically designed for travel packing.",
          time: "22 days ago",
        },
      ],
    },
    {
      id: "4",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Videokonferenz am Donnerstag 1...",
      time: "28 days ago",
      messages: [
        {
          id: "m7",
          sender: "other",
          text: "Hallo, kurze Bestätigung für die Besprechung am Donnerstag um 14:00 Uhr.",
          time: "28 days ago",
        },
      ],
    },
    {
      id: "5",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Black midi skirt with white flowers",
      time: "1 month ago",
      messages: [
        {
          id: "m8",
          sender: "other",
          text: "Hello! Are there matching floral tops or accessories for this midi skirt?",
          time: "1 month ago",
        },
      ],
    },
    {
      id: "6",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Sun hat for women protection cap",
      time: "1 month ago",
      messages: [
        {
          id: "m9",
          sender: "other",
          text: "Is bulk pricing available for orders above 20 units?",
          time: "1 month ago",
        },
      ],
    },
    {
      id: "7",
      user: "Admin",
      avatar: ADMIN_AVATAR,
      subject: "Sun hat for women protection cap",
      time: "1 month ago",
      messages: [
        {
          id: "m10",
          sender: "other",
          text: "Inquiry about international delivery timelines.",
          time: "1 month ago",
        },
      ],
    },
  ]);

  const filteredChats = chats.filter(
    (c) =>
      c.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const targetChatId = activeChatId || chats[0]?.id;
    if (!targetChatId) return;

    const newMessage: MessageItem = {
      id: `m_${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      time: "Just now",
    };

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === targetChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    if (!activeChatId) {
      setActiveChatId(targetChatId);
    }

    setInputText("");
  };

  return (
    <div className="bg-white font-sans">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Breadcrumb matching exact Modesy style */}
        <nav className="text-[12.5px] text-[#777] mb-4">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#333]">Messages</span>
        </nav>

        {/* Main Messenger Box */}
        <div className="bg-white border border-[#e4e7ea] rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row min-h-[580px] overflow-hidden">
          {/* Left Sidebar: Recent Chats */}
          <div className="w-full md:w-[320px] lg:w-[340px] border-r border-[#eef0f2] flex flex-col shrink-0">
            {/* User Profile Header */}
            <div className="p-4 flex items-center gap-3 border-b border-[#f8f9fa]">
              <div className="relative w-12 h-12 shrink-0">
                <img
                  src={
                    userProfile?.avatar ||
                    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=120&q=80"
                  }
                  alt={userProfile?.storeName || userProfile?.name || "Trendshop"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full"
                  title="Online"
                />
              </div>
              <div className="font-semibold text-[15px] text-[#222]">
                {userProfile?.storeName || userProfile?.name || "Trendshop"}
              </div>
            </div>

            {/* Search Input with icon on right */}
            <div className="p-3.5 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3.5 pr-9 py-2 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Section Header */}
            <div className="px-4 py-2">
              <span className="text-[13px] font-semibold text-[#222]">Recent Chats</span>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-[#f7f8fa]">
              {filteredChats.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                      isActive ? "bg-[#f4f6f8]" : "hover:bg-[#fbfcfd]"
                    }`}
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.user}
                      className="w-11 h-11 rounded-full object-cover shrink-0 shadow-2xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[13.5px] font-semibold text-[#222] truncate">
                          {chat.user}
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-600 truncate leading-snug">
                        {chat.subject}
                      </p>
                      <span className="text-[11px] text-gray-400 block mt-0.5">{chat.time}</span>
                    </div>
                  </div>
                );
              })}

              {filteredChats.length === 0 && (
                <div className="p-6 text-center text-[12px] text-gray-400">
                  No conversations found.
                </div>
              )}
            </div>
          </div>

          {/* Right Area: Conversation / Messaging Window */}
          <div className="flex-1 flex flex-col justify-between bg-white min-h-[580px]">
            {activeChat ? (
              <>
                {/* Active Chat Top Header */}
                <div className="p-3.5 px-5 border-b border-[#f1f3f5] flex items-center justify-between bg-[#fafbfc]">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.user}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-semibold text-[#222]">
                          {activeChat.user}
                        </h3>
                        <span className="text-[11px] text-gray-400">• {activeChat.time}</span>
                      </div>
                      <p className="text-[12px] text-gray-500 font-medium truncate max-w-[450px]">
                        {activeChat.subject}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveChatId(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 transition-colors"
                    title="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[460px] bg-white">
                  {activeChat.messages.map((msg) => {
                    const isUser = msg.sender === "user";
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 max-w-[78%] ${
                          isUser ? "ml-auto flex-row-reverse" : ""
                        }`}
                      >
                        {!isUser && (
                          <img
                            src={activeChat.avatar}
                            alt={activeChat.user}
                            className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                          />
                        )}
                        <div>
                          <div
                            className={`p-3.5 rounded-[6px] text-[13px] leading-relaxed shadow-2xs ${
                              isUser
                                ? "bg-[#00ab97] text-white"
                                : "bg-[#f1f5f9] text-[#2c333e] border border-[#e2e8f0]"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div
                            className={`text-[10.5px] text-gray-400 mt-1 flex items-center gap-1 ${
                              isUser ? "justify-end" : ""
                            }`}
                          >
                            <span>{msg.time}</span>
                            {isUser && <CheckCheck className="w-3 h-3 text-[#00ab97]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Empty State matching Screenshot 1 */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="bg-[#f0f4f8] text-[#55606d] text-[14px] font-normal px-7 py-3 rounded-full select-none shadow-2xs">
                  Select a chat to start messaging
                </div>
              </div>
            )}

            {/* Bottom Message Input Bar matching Screenshot 2 & 3 */}
            <div className="p-4 border-t border-[#f1f3f5] bg-white">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-[#e5e7eb] focus:border-[#00ab97] rounded-full pl-5 pr-12 py-2.5 text-[13.5px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-3 p-1.5 text-gray-400 hover:text-[#00ab97] disabled:opacity-40 transition-colors cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-5 h-5 -rotate-12 translate-x-[-1px]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
