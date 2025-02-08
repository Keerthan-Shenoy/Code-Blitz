import ProfileSidebar from "../components/profile_sidebar";

export default function Chat() {
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
                    <div className="bg-white flex items-center justify-between py-2 px-5 rounded my-2">
                        <div className="flex items-center">
                            <img src={`https://i.pravatar.cc/?img=3`} className="h-16 w-16 rounded-full" />
                            <div className="p-5">
                                <div className="text-lg font-bold">Introduction to HTML</div>
                                <div className="text-sm">Virat Kohli</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end h-full text-sm text-gray-500 self-end">09:05</div>
                    </div>
                    <div className="bg-white flex items-center justify-between py-2 px-5 rounded my-2">
                        <div className="flex items-center">
                            <img src={`https://i.pravatar.cc/?img=3`} className="h-16 w-16 rounded-full" />
                            <div className="p-5">
                                <div className="text-lg font-bold">Introduction to HTML</div>
                                <div className="text-sm">Virat Kohli</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end h-full text-sm text-gray-500 self-end">09:05</div>
                    </div>
                    <div className="bg-white flex items-center justify-between py-2 px-5 rounded my-2">
                        <div className="flex items-center">
                            <img src={`https://i.pravatar.cc/?img=3`} className="h-16 w-16 rounded-full" />
                            <div className="p-5">
                                <div className="text-lg font-bold">Introduction to HTML</div>
                                <div className="text-sm">Virat Kohli</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end h-full text-sm text-gray-500 self-end">09:05</div>
                    </div>
                    <div className="bg-white flex items-center justify-between py-2 px-5 rounded my-2">
                        <div className="flex items-center">
                            <img src={`https://i.pravatar.cc/?img=3`} className="h-16 w-16 rounded-full" />
                            <div className="p-5">
                                <div className="text-lg font-bold">Introduction to HTML</div>
                                <div className="text-sm">Virat Kohli</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end h-full text-sm text-gray-500 self-end">09:05</div>
                    </div>
                    <div className="bg-white flex items-center justify-between py-2 px-5 rounded my-2">
                        <div className="flex items-center">
                            <img src={`https://i.pravatar.cc/?img=3`} className="h-16 w-16 rounded-full" />
                            <div className="p-5">
                                <div className="text-lg font-bold">Introduction to HTML</div>
                                <div className="text-sm">Virat Kohli</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end h-full text-sm text-gray-500 self-end">09:05</div>
                    </div>
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>

                {/* Chat messages area - Make this scrollable */}
                <div className="flex-1 overflow-y-auto my-1 scrollbar-hide overscroll-none">
                    <div className="flex px-2 my-2">
                        <img src={`https://i.pravatar.cc/?img=3`} className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex flex-1 items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hellooo oo ooo ooooooo ooooo oooo oooooo ooo ooooooo oooo oooooooo ooo ooooooooo oooo oooooooo oooooo ooooo o ooooooo oooooooo ooooooooo ooooooo ooooooo oooo ooooo ooooooo  ooooo
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <img src={`https://i.pravatar.cc/?img=3`} className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex flex-1 items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <div className="flex flex-1 justify-end     items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <div className="flex flex-1 justify-end     items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <div className="flex flex-1 justify-end     items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <div className="flex flex-1 justify-end     items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <div className="flex flex-1 justify-end     items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <img src={`https://i.pravatar.cc/?img=3`} className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex flex-1 items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>
                    <div className="flex px-2 my-2">
                        <img src={`https://i.pravatar.cc/?img=3`} className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex flex-1 items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Hello
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>  
                    <div className="flex px-2 my-2">
                        <img src={`https://i.pravatar.cc/?img=3`} className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex flex-1 items-end">
                            <div className="text-black bg-white px-5 py-2 max-w-[66%] ml-5 mr-1 rounded break-words">
                                Welcome
                            </div>
                            <div className="text-xs whitespace-nowrap ml-2">09:05</div>
                        </div>
                    </div>  
                </div>

                {/* Chat input - Keep at bottom */}
                <div className="h-[50px] bg-white mt-1 flex items-center">
                    <button className="pl-5 pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                    </button>
                    <button className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <input type="text" placeholder="Type a message" className="h-full px-2 w-full outline-none"></input>
                    <button className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}