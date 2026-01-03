import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppChat.css";

const WhatsAppChat = () => {
  const phoneNumber = "8002009746"; // ← your WhatsApp number (country code + number)
  const message = encodeURIComponent(
    "Hi 👋 I need help with my order"
  );

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppChat;
