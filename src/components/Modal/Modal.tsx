import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently active element before opening the modal
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      if (modalRef.current) {
        modalRef.current.focus(); // Move focus to the modal when it opens
      }
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      // Add event listener for ESC key to close the modal
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        // Remove the ESC event listener when the modal closes
        document.removeEventListener("keydown", handleKeyDown);

        // Restore focus to the previously active element
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      data-testid="mockId"
      className="modal-overlay"
      onClick={onClose}
      role="dialog" // Defines this as a dialog for screen readers
      aria-labelledby="modal-title" // Associates the title with the modal
      aria-describedby="modal-description" // Associates a description with the modal
      aria-modal="true" // Indicates that this is an active modal
      tabIndex={-1} // Allows the modal to receive focus
      ref={modalRef} // Set the ref to apply focus when opening
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title">{title}</h2>
        <div id="modal-description" className="modal-body">{children}</div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
