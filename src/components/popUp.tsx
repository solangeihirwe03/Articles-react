import React, {useEffect} from "react";
interface PopupProps {
    message: string;
    type: "success" | "error"; // Success or Error message
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); 

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`absolute top-0 left-0 w-full flex justify-center`}>
            <div 
                className={`w-full p-4 rounded-lg shadow-lg text-black ${type === "error" ? "border-red-500 bg-white" : "border-green-500 bg-white "} border-2`}>
                <p className="font-semibold">{message}</p>
                <button onClick={onClose} className="mt-2 bg-white text-black px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;