"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CommunityPath } from "../../constant";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Top Skills");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [skillsData, setSkillsData] = useState({});
  const [communitiesData, setCommunitiesData] = useState([]); // To store communities
  const [loading, setLoading] = useState(true); // To handle loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track the login state
  const scrollRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    // Check local storage to see if the user is logged in
    const user = localStorage.getItem("user_data"); // Assuming user info is stored in local storage
    if (user) {
      setIsLoggedIn(true);
    }

    // Fetch the data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${CommunityPath}/topComs`);
        const data = await response.json();
        console.log(data.communities);
        setCommunitiesData(data.communities); // Assuming the response has communitiesData in the correct format
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

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
    "Top Skills",
    "Science",
    "Arts",
    "Cooking",
    "Sports",
    "Gaming",
    "Self care",
    "Animal care",
    "Travel",
    "Beauty",
  ];

  const sampleImage =
    "https://www.chieflearningofficer.com/wp-content/uploads/2023/05/AdobeStock_577015054-1536x1024.jpeg";

  const sendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatMessages([...chatMessages, { text: userMessage, sender: "user" }]);
      setUserMessage("");
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: "This is a bot response!", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen text-gray-900 p-5 bg-gradient-to-r from-green-100 to-yellow-100">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-copperplate gothic bold text-blue-700">SKILLEX</h1>
        <div className="flex ml-[200px]">
          <input
            type="text"
            placeholder="Search skills..."
            className="border p-2 rounded w-80 shadow-md mx-auto"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
        <div className="flex space-x-4 ml-[190px]">
          {!isLoggedIn && (
            <>
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
            </>
          )}
          {isLoggedIn && (
            <Link
              href="/profile"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Profile
            </Link>
          )}
        </div>
      </header>

      {/* Categories Selection */}
      <div className="flex justify-center gap-6 text-lg font-medium mb-6 text-blue-700">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded transition ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-blue-200 hover:bg-blue-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Section for Selected Category with Hover Effect */}
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        skillsData[selectedCategory] && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              {selectedCategory} Skills
            </h2>
            <div className="flex gap-4 overflow-x-auto p-2">
              {skillsData[selectedCategory].map((skill, i) => (
                <div
                  key={i}
                  className="relative w-80 p-6 rounded-lg bg-blue-100 shadow-md text-center text-blue-900 transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer"
                >
                  <Image
                    src={skill.image || sampleImage}
                    alt={skill.name}
                    width={300}
                    height={200}
                    className="mx-auto rounded"
                    unoptimized
                  />
                  <h3 className="font-bold mt-2">{skill.name}</h3>
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity p-4 rounded-lg">
                    <h3 className="font-bold text-lg">{skill.name}</h3>
                    <p>Provider: {skill.provider}</p>
                    <p>Duration: {skill.duration}</p>
                    <p>Price: {skill.price}</p>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mt-2">
                      Join Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      )}

      {/* Communities Section */}
      {loading ? (
        <p>Loading communities...</p>
      ) : (
        communitiesData.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Communities in {selectedCategory}
            </h2>
            <div className="flex gap-4 flex-wrap p-2">
              {communitiesData.map((community) => (
                <div
                  key={community._id}
                  className="relative w-80 p-6 rounded-lg bg-blue-100 shadow-md text-center text-blue-900 transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer"
                >
                  <Image
                    src={community.image_url || sampleImage}
                    alt={community.title}
                    width={300}
                    height={200}
                    className="mx-auto rounded"
                    unoptimized
                  />
                  <h3 className="font-bold mt-2">{community.title}</h3>
                  <p className="text-sm">{community.description}</p>
                  <div className="mt-3">
                    <p className="text-sm">Host: {community.host_first_name}</p>
                    <p className="text-sm">Price: {community.price === 0 ? "Free" : `$${community.price}`}</p>
                    <p className="text-sm">Average Rating: {community.averageRating || "No rating"}</p>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mt-2">
                      Join Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      )}

      {/* Chatbot */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg fixed bottom-5 right-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>

      {chatOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-16 right-5 w-[500px] bg-gray-200 shadow-lg rounded-lg p-4 border border-gray-300"
        >
          <h2 className="text-lg font-bold text-blue-700">Chatbot</h2>
          <div className="h-40 overflow-y-auto border p-2 mb-2 scrollbar-hide overscroll-none">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 my-2 rounded ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-white"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
            <button 
              onClick={sendMessage}
              className="mt-2 bg-white px-3 py-2 rounded border ml-2">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
