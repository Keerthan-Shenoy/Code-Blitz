'use client';
import ProfileSidebar from "../components/profile_sidebar";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { CommunityPath } from "../../../constant";
import Link from 'next/link';
import { MessagePath } from "../../../constant";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef(null);
    const buttonRef = useRef(null);
    const fileInputRef = useRef(null);
    const storedUserData = localStorage.getItem('user_data');
    const userID = JSON.parse(storedUserData);
    const handleFileSelect = (event) => {
        const files = event.target.files;
        // Handle the selected files here
        console.log('Selected files:', files);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside both the dialog and the button
            if (chatRef.current && 
                !chatRef.current.contains(event.target) && 
                !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const socket = io.connect("http://localhost:3001");
    const [communities, setCommunities] = useState([]);
    const [com_msg, setCommunitiesMessages] = useState([]);
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");

    // Fetch user communities on load
    useEffect(() => {
        if (storedUserData) { 
            console.log("User_id: ", userID._id);
            fetch(`${CommunityPath}/user-communities?user_id=${userID._id}`, {  
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json()) 
            .then(data => {
                console.log("Communities: ", data)
                setCommunities(data.communities); 
            })
            .catch(error => {
                console.error('There was an error fetching the communities!', error);
            });      
        }
    }, []);

    // Fetch messages when a room is joined
    useEffect(() => {
        if (room) {
            fetchMessages(); // Re-fetch messages when a room is joined
        }
    }, [room]);

    const fetchMessages = () => {
        fetch(`${MessagePath}/getComMsg/${room}`, {  
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log("data : ", data.messages);
            setCommunitiesMessages(data.messages);  // Set the messages data
            // console.log("CommMsg : ", com_msg);
        })
        .catch(error => {
            console.error('There was an error fetching the messages!', error);
        });
    };

    useEffect(() => {
        console.log("CommMsg : ", com_msg);
    }, [com_msg]);

    const joinRoom = (comid) => {
        setRoom(comid);
        if (comid) {
            socket.emit("join_room", comid);
        }
    };

    const handleChangeMessage = (e) => {
        setMessage(e.target.value); // Properly update message state from input
    };

    // Function to send a message
    const sendMessage = async () => {
        if (message && room) {
            const formData = new FormData();
            formData.append("community_id", room);
            formData.append("sender_id", userID._id);
            formData.append("text", message);  
            formData.append("file_url", null);  
            console.log("FormData : ", formData)
            try {
                const response = await fetch(`${MessagePath}/putMessage`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();  
                    setMessage(""); // Clear the message input
                    fetchMessages(); // Call the useEffect to fetch the latest messages after sending the message
                } else {
                    console.error("Failed to send message");
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    // Hook to receive messages in real time
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setCommunitiesMessages((prevMsg) => [...prevMsg, data.message]); // Corrected
        });
    }, [socket]);

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-yellow-100 min-h-screen px-2">
            {/* Left sidebar - Communities */}
            <ProfileSidebar />
            <div className="w-[400px] m-10 flex flex-col h-[calc(100vh-5rem)] z-10 pl-[300px]">
                <div className="text-3xl py-1 font-bold">Communities</div>
                <div className="py-5">
                    <input type='text' className="h-[50px] pl-10 w-[400px] outline-none" placeholder="Search"></input>
                </div>
                <div className="overflow-y-auto flex-1 scrollbar-hide overscroll-none w-[400px]">
                    {communities.map((com) => (
                        <div key={com._id} className="bg-white flex items-center justify-between py-2 px-5 rounded my-2" onClick={() => joinRoom(com._id)}>
                            <div className="flex items-center">
                                <img src={com.image_url || "https://i.pravatar.cc/?img=3"} className="h-16 w-16 rounded-full" />
                                <div className="p-5">
                                    <div className="text-lg font-bold">{com.title}</div>
                                    <div className="text-sm">{com.host_id.first_name}</div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end h-full text-sm text-gray-500 self-end">09:05</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right section - Chat area */}
            <div className="m-10 w-full flex flex-col h-[calc(100vh-5rem)] pl-[250px]">
                {/* Chat header */}
                <div className="bg-white flex items-center justify-between rounded px-5 py-2">
                    <div className="flex items-center">
                        <img src={`https://i.pravatar.cc/?img=3`} className="h-16 w-16 rounded-full" />
                        <div className="p-5">
                            <div className="text-lg font-bold">Introduction to HTML</div>
                            <div className="text-sm">Virat Kohli</div>
                        </div>
                    </div>
                    <button className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.241.437-.613.43-.991a6.895 6.895 0 0 1 0-.255c.008-.379-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.075-.124a6.47 6.47 0 0 1 .22-.128c.332-.184.582-.496.645-.87l.213-1.28zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        </svg>
                    </button>
                </div>

                {/* Chat messages */}
                <div className="h-full overflow-y-auto bg-gray-100 p-5">
                    {com_msg.length > 0 ? (
                        com_msg.map((msg) => (
                            <div key={msg._id} className={`flex ${msg.sender_id._id === userID._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`rounded p-3 m-2 ${msg.sender_id._id === userID._id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No messages yet</div>
                    )}
                </div>

                {/* Chat input */}
                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={handleChangeMessage}
                        className="flex-1 p-2 border rounded"
                        placeholder="Type your message here..."
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
