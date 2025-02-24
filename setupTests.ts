import "@testing-library/jest-dom";

// Ensure the modal root exists for React Portal
const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);
