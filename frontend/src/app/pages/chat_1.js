'use client'
import ProfileSidebar from "../components/profile_sidebar";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommunityPath } from "../../../constant";
import Link from 'next/link';

export default function Chat() {
    const socket = io.connect("http://localhost:3001");
    const [communities, setCommunities] = useState([]);
    const [com_msg, setCommunitiesMessages] = useState([]);
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    // Fetch user communities on load
    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data');
  
        if (storedUserData) {
            const userID = JSON.parse(storedUserData); // Parse the JSON string to an object
            console.log("User_id: ", userID._id);
            fetch(`${CommunityPath}/user-communities?user_id=${userID._id}`, {  // Append user_id as a query parameter
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json()) 
            .then(data => {
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
            axios.get(`http://localhost:5000/clubs/${room}`)
                .then(response => {
                    console.log(response.data);
                    setCommunitiesMessages(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the messages!', error);
                });
        }
    }, [room]); // Add 'room' as a dependency to refetch messages when the room changes

    const joinRoom = (comid) => {
        setRoom(comid);
        if (comid) {
            socket.emit("join_room", comid);
        }
    };

    const handleChangeMessage = (e) => {
        setMessage(e.target.value); // Properly update message state from input
    };

    const sendMessage = () => {
        if (message && room) {
            socket.emit("send_message", { message, room });
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
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
                </div>

                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto my-1 scrollbar-hide overscroll-none">
                    {com_msg.map((msg, idx) => (
                        <div key={idx} className="flex px-2 my-2">
                            <img src={'https://i.pravatar.cc/?img=3'} className="h-8 w-8 rounded-full shrink-0" />
                            <div className="flex flex-1 items-end">
                                <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                    <div className="font-bold">Virat Kohli</div>
                                    <div className="text-sm">{msg}</div>
                                </div>
                                <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat input */}
                <div className="h-[50px] bg-white mt-1 flex items-center">
                    <button className="pl-5 pr-2">
                        {/* Add attachment icons */}
                    </button>
                    <input type="text" placeholder="Type a message" className="h-full px-2 w-full outline-none" value={message} onChange={handleChangeMessage} />
                    <button className="p-2" onClick={sendMessage}>
                        {/* Send message button */}
                    </button>
                </div>
            </div>
        </div>
    );
}
