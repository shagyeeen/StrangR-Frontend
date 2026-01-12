import { useState } from "react";
import emailjs from "emailjs-com";

interface Props {
  onClose: () => void;
}

const FeedbackModal = ({ onClose }: Props) => {
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");

  const submitFeedback = () => {
    if (stars === 0) return alert("Please rate first");

    emailjs.send(
      "service_ysaqc52",
      "template_sr7safc",
      {
        stars,
        message,
      },
      "37NGlqvU3ZbRwCWmB"
    );

    alert("Thanks for your feedback ❤️");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl w-80 text-white">
        <h2 className="text-center mb-3">Rate your chat</h2>

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setStars(n)}
              style={{
                fontSize: "26px",
                cursor: "pointer",
                color: n <= stars ? "#FFD700" : "#777",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Optional feedback..."
          className="w-full p-2 rounded bg-black/30 text-white mb-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={submitFeedback}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;