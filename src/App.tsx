import { useState, CSSProperties } from "react";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={appStyle}>
      <button onClick={() => setIsOpen(true)} style={openButtonStyle}>
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>This is a modal using React Portal!</p>
      </Modal>
    </div>
  );
}

// Style for the main page
const appStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center", // Centers horizontally
  alignItems: "flex-start", // Aligns content to the top
  height: "100vh", // Uses full screen height
  paddingTop: "20px", // Adds some space from the top
};

// Style for the "Open Modal" button
const openButtonStyle: CSSProperties = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background 0.3s",
  position: "fixed", // Fixes the button on the screen
  top: 20, // Distance from the top
  left: "50%", // Positions the button in the middle of the screen
  transform: "translateX(-50%)", // Ensures true centering
};
