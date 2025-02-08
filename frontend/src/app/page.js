"use client";
 
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Top Skills");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const scrollRef = useRef(null);
  const chatRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setChatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const topCategories = ["Science", "Cooking", "Travel"];
  const allCategories = [
    "Top Skills", "Science", "Arts", "Cooking", "Sports", "Gaming",
    "Self care", "Animal care", "Travel", "Beauty"
  ];
  
  const sampleImage = "https://www.chieflearningofficer.com/wp-content/uploads/2023/05/AdobeStock_577015054-1536x1024.jpeg";
  const topskills=[
    { name: "Data Science", provider: "John Doe", duration: "3 months", price: "$50", image: sampleImage },
      { name: "Graphic Design", provider: "Jane Smith", duration: "2 months", price: "$40", image: sampleImage },
      { name: "Photography", provider: "Alice Brown", duration: "4 months", price: "$60", image: sampleImage }
  ]
  const skillsData = {
    Science: [
      { name: "Physics", provider: "Dr. Alan Turing", duration: "3 months", price: "$70", image: sampleImage },
      { name: "Chemistry", provider: "Marie Curie", duration: "4 months", price: "$65", image: sampleImage }
    ],
    Cooking: [
      { name: "Baking", provider: "Gordon Ramsay", duration: "2 months", price: "$80", image: sampleImage },
      { name: "Grilling", provider: "Bobby Flay", duration: "1 month", price: "$50", image: sampleImage }
    ],
    Travel: [
      { name: "Backpacking", provider: "Nomadic Matt", duration: "3 months", price: "$90", image: sampleImage }
    ]
  };

  const sendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatMessages([...chatMessages, { text: userMessage, sender: "user" }]);
      setUserMessage("");
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "This is a bot response!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen  p-6 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-copperplate gothic bold text-blue-700">SKILLEX</h1>
        <div className="flex ml-[200px]">
  <input type="text" placeholder="Search skills..." className="border p-2 rounded w-80 shadow-md mx-auto" />
  <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
</div>
<div className="flex space-x-4 ml-[190px]">
  <Link 
    href="/login" 
    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
  >
    Login
  </Link>
  <Link 
    href="/register" 
    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
  >
    SignUp
  </Link>
  <Link 
    href="/profile" 
    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
  >
  Profile
  </Link>
</div>
{/* <div className="fixed top-5 right-5">
  <button 
    onClick={() => window.location.href = "/profile"} 
    className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
  >
    
    <span className="text-xs mt-1">Profile</span>
  </button>
</div> */}

      </header>
      
      {/* Categories Selection */}
      <div className="flex justify-center gap-6 text-lg font-medium mb-6 text-blue-700">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded transition ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-blue-200 hover:bg-blue-300"}`}
          >
            {category}
          </button>
        ))}
      </div>
              {/* Skills Section for Selected Category with Hover Effect */}
      {skillsData[selectedCategory] && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700">{selectedCategory} Skills</h2>
          <div className="flex gap-4 overflow-x-auto p-2">
            {skillsData[selectedCategory].map((skill, i) => (
              <div key={i} className="relative w-80 p-6 rounded-lg bg-blue-100 shadow-md text-center text-blue-900 transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer hover:z-10">
                <Image src={skill.image} alt={skill.name} width={300} height={200} className="mx-auto rounded" unoptimized />
                <h3 className="font-bold mt-2">{skill.name}</h3>
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity p-4 rounded-lg">
                  <h3 className="font-bold text-lg">{skill.name}</h3>
                  <p>Provider: {skill.provider}</p>
                  <p>Duration: {skill.duration}</p>
                  <p>Price: {skill.price}</p>
                  <button className="bg-green-500 text-white px-3 py-1 rounded mt-2">Join Course</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Top Skills Section */}
      {selectedCategory === "Top Skills" && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700">Top Skills</h2>
          <div className="flex items-center">
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto p-2 w-full no-scrollbar">
              {topskills.map((skill, i) => (
                <div 
                  key={i} 
                  className="relative w-80 p-6 rounded-lg bg-blue-100 shadow-md text-center text-blue-900 transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer"
                >
                  <Image src={skill.image} alt={skill.name} width={300} height={200} className="mx-auto rounded" unoptimized />
                  <h3 className="font-bold mt-2">{skill.name}</h3>
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity p-4 rounded-lg">
                    <h3 className="font-bold text-lg">{skill.name}</h3>
                    <p>Provider: {skill.provider}</p>
                    <p>Duration: {skill.duration}</p>
                    <p>Price: {skill.price}</p>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mt-2">Join Course</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Top Skills from Top Categories */}
      {selectedCategory === "Top Skills" && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700">Top Categories</h2>
          {topCategories.map((category) => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-medium mb-2 text-blue-700">{category}</h3>
              <div className="flex gap-4 overflow-x-auto p-2">
                {skillsData[category]?.map((skill, i) => (
                  <div key={i} className="relative w-80 p-6 rounded-lg bg-blue-100 shadow-md text-center text-blue-900 transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer">
                    <Image src={skill.image} alt={skill.name} width={300} height={200} className="mx-auto rounded" unoptimized />
                    <h3 className="font-bold mt-2">{skill.name}</h3>
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity p-4 rounded-lg">
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <p>Provider: {skill.provider}</p>
                      <p>Duration: {skill.duration}</p>
                      <p>Price: {skill.price}</p>
                      <button className="bg-green-500 text-white px-3 py-1 rounded mt-2">Join Course</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        
      )}
            <div className="fixed bottom-5 right-5">
        <button onClick={() => setChatOpen(!chatOpen)} className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">Chat</button>
      </div>
            {chatOpen && (
        <div ref={chatRef} className="fixed bottom-16 right-5 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
          <h2 className="text-lg font-bold text-blue-700">Chatbot</h2>
          <div className="h-40 overflow-y-auto border p-2 mb-2">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`p-2 rounded ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200"}`}>{msg.text}</div>
            ))}
          </div>
          <input type="text" placeholder="Ask me anything..." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} className="w-full border p-2 rounded mt-2" />
          <button onClick={sendMessage} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Send</button>
        </div>
      )}
    </div>
  );
}