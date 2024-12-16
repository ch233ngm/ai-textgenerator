export default function AIResponseChat({ reply, counterpart, inputText }) {

    return (
        <div className="w-full">
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="chat-header">
                    {counterpart ? counterpart : ' Obi-Wan Kenobi'}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">
                    {inputText.trim() ? inputText.trim() : ' You were the Chosen One!'}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="chat-header">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {
                    reply ? (<div className="chat-bubble">{reply}</div>) : (<div className="chat-bubble skeleton"></div>)
                }

                <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
        </div>
    );
}