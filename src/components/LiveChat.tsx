import { useEffect } from "react";
import ChatMassage from "./ChatMassage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
import { useState } from "react";

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");

    const dispatch = useDispatch();

    const chatMessages = useSelector((store: any) => store.chat.messages);

    useEffect(() => {
        const i = setInterval(() => {
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(20) + "✌",
            }));
        }, 2000)

        return () => clearInterval(i);
    }, [])

    return (
        <>
            <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                <div>
                    {chatMessages.map((c, index) => <ChatMassage key={index} name={c.name} message={c.message} />)}
                </div>
            </div>
            <form
                className="flex w-full p-2 ml-2 border border-black rounded-lg"
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(addMessage({
                        name: "Vijay",
                        message: liveMessage,
                    }))
                    setLiveMessage("");
                }}>
                <input className="px-2 w-96" value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} type="text" />
                <button className="px-2 mx-2 bg-green-100">Send</button>
            </form>
        </>
    );
};

export default LiveChat;