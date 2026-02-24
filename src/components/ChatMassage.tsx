const ChatMassage = ({ name, message }: { name: string; message: string }) => {
    return (
        <div className="flex items-center shadow-sm p-2">
            <img
                className="h-8"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
                alt="user"
            />
            <span className="font-bold px-4">{name}</span>
            <span>{message}</span>
        </div>
    );
};

export default ChatMassage;