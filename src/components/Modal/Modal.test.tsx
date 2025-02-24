import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import Modal from "./Modal";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Modal", () => {
  const mockClose = vi.fn();

  beforeEach(() => {
    mockClose.mockReset();
  });

  test("renders modal with expected controls", async () => {
    render(
      <Modal isOpen={true} title="Test Modal" onClose={mockClose}>
        Content
      </Modal>
    );

    // Wait for the modal to appear in the DOM
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(screen.getByRole("heading", { name: "Test Modal" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  test("calls onClose when pressing the ESC key", async () => {
    render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);
    
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  test("calls onClose when clicking outside the modal", async () => {
    render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);
    
    const overlay = screen.getByTestId("mockId");
    fireEvent.click(overlay);

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  test("calls onClose when clicking the close button", async () => {
    render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);
    
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  test("Modal is accessible", async () => {
    const { container } = render(
      <Modal isOpen={true} title="Accessible Modal" onClose={mockClose}>
        Accessible Content
      </Modal>
    );

    const results = await axe(container);
    
    expect(results.violations.length).toBe(0);
  });
});
