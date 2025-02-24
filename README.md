# Component Library Take-Home Exercise

This repository contains a solution for a **component library challenge**, focused on creating a **reusable, accessible, and tested Modal component** using **React, TypeScript, and Vitest**. 

A key focus of this project is **ADA compliance and accessibility best practices**, ensuring the modal is fully usable for individuals with disabilities.

---

## 📌 Challenge Overview

### **Scenario**
A reusable component library repository was accidentally deleted, but the **unit tests were recovered**. The task is to **rebuild the library**, ensuring the provided tests pass while maintaining clean and scalable code.

### **Instructions**
- The total time limit for this challenge is **2.5 hours**.
- Both tasks are equally important, so it's better to **partially complete both rather than fully complete only one**.
- **Document all decisions**, including architecture, tooling choices, and any unfinished steps.
- The final solution should be **submitted as a GitHub repository**.

---

## 🛠 **Task One - Configuration and Documentation**

The first task involves setting up the **foundation of the component library**. The recommended stack includes:

✅ **React** - UI component development  
✅ **TypeScript** - Type safety and maintainability  
✅ **React Testing Library** - Ensures proper component behavior  
✅ **Vitest** - Fast and modern testing framework  

### **Additional Considerations**
- **ADA-compliant accessibility implementation** ✅
- Linting (`ESLint`) and formatting (`Prettier`) for code consistency.
- Developer experience improvements like `Husky` for pre-commit checks.
- Modular folder structure for **scalability**.

📌 **If configuration is not fully implemented, document the intended approach.**

---

## 🎯 **Task Two - Component Implementation**

The second task is to **recreate a reusable component** that meets the requirements of the provided unit tests.

### **Component Requirements**
- **Fully ADA-compliant Modal Component** 🔥
- Uses **ARIA attributes** for screen reader support.
- Supports **keyboard navigation** (focus management, ESC key, and tab order).
- Click **outside the modal** should close it.
- Component should be **flexible and reusable**.

---

## 🏆 **ADA & Accessibility Compliance**
This project was developed with **strict adherence to ADA (Americans with Disabilities Act) and WCAG (Web Content Accessibility Guidelines)** to ensure an inclusive experience.

### 🔹 **ADA Features Implemented**
✅ **Keyboard Navigation** → Users can navigate using only the keyboard.  
✅ **Screen Reader Support** → ARIA attributes like `role="dialog"`, `aria-labelledby`, and `aria-describedby` are used.  
✅ **Focus Management** → The modal traps focus when opened and restores focus to the last active element when closed.  
✅ **ESC Key Handling** → Users can close the modal with the `Escape` key.  
✅ **Click Outside to Close** → Clicking outside the modal triggers the `onClose` function.  
✅ **High Contrast Mode Support** → Ensures readability for visually impaired users.  

📌 These improvements ensure that the modal meets **ADA** and **WCAG 2.1 AA** compliance standards.

---

## 🧪 **Testing Strategy**

This project uses **Vitest** and **React Testing Library** for unit testing.  
The `Modal` component must pass the following tests:

```typescript
describe('Modal', () => {
  const mockClose = vi.fn();

  beforeAll(() => {
    mockClose.mockReset()
  });

  test('renders modal with expected controls', () => {
    render(<Scenario />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  describe('when passed onClose handler', () => {
    test('calls onClose action when pressing the ESC key', () => {
      render(<Scenario onClose={mockClose} />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('renders dismissible button that calls onClose action when clicked', async () => {
      const { user } = renderWithUser(<Scenario onClose={mockClose} />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose action when clicking outside of the modal', async () => {
      const { user } = renderWithUser(<Scenario data-testid="mockId" onClose={mockClose} />);
      const scrimElement = screen.getByTestId('mockId');
      await user.click(scrimElement);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
