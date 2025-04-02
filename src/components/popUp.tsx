import { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

type PopupProps = {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  duration?: number;
};

const Popup = ({ type, message, onClose, duration = 3000 }: PopupProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed top-2 right-[34rem] z-50 p-4 rounded-md shadow-lg bg-white 
      ${type === 'success' ? ' text-green-800 border-green-800' : ' text-red-800 border-red-800'}`}>
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <FaCheckCircle className="text-xl" />
        ) : (
          <FaTimesCircle className="text-xl" />
        )}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Popup;