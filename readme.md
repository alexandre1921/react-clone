# React Clone

This one weekend duration side project is a simplified clone of React, showcasing how to build a **component-based** architecture, manage **state** and **effects**, and **navigate** between different pages. It includes:
1. A **Main Page** that demonstrates live JavaScript logic with a **clock** example.
2. A **Counter Page** displaying a simple increment/decrement mechanism.
3. A **basic router** to switch between pages (if implemented in your project).

## Table of Contents
- [React Clone](#react-clone)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Getting Started](#getting-started)
  - [Usage](#usage)

---

## Key Features

1. **Component System**  
   Each UI element (e.g., **MainPage**, **CounterPage**, **Clock**, **FeatureList**) is a standalone component using a system similar to React Hooks.

2. **State Management** (`useState`)  
   Manage local component state with `useState`. Trigger **re-renders** by updating state values.

3. **Refs** (`useRef`)  
   Store mutable values across renders without causing re-renders.

4. **Effects** (`useEffect`)  
   Perform side effects like setting intervals or subscribing to events. Clean up when dependencies change or components unmount.

5. **DOM Events** (`useRegisterCallbackOnELement`)  
   Dynamically attach event listeners by returning an `onclick="..."` or similar attribute, making it easy to listen for user input.

6. **Minimal Router** *(Optional)*  
   If you’ve integrated routing, navigate to different pages (e.g., `/main-page`, `/counter`) without page refreshes.

---

## Getting Started

1. **Clone** the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

simply open the `index.html` in a browser.

---

## Usage

- **Main Page**  
  Showcases a welcome message, a **Features** list, and a **Clock** component that updates every second.  

- **Counter Page**  
  A simple counter demonstrating the usage of `useState` and event handling with `useRegisterCallbackOnELement`.  
