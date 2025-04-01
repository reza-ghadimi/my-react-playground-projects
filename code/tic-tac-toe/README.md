
---

# 🎮 Tic-Tac-Toe – A React.js Project  

Welcome to the **Tic-Tac-Toe** project! 🚀 This is a **React.js** implementation of the classic **Tic-Tac-Toe** game, structured for modularity and maintainability.  

---

## 📌 Features  
✅ **Turn-based Gameplay** – Players take turns marking the board.  
✅ **Winner Detection** – Automatically determines the winner or a draw.  
✅ **Game Log** – Keeps track of player moves.  
✅ **Restart Button** – Resets the board for a new game.  
✅ **Component-Based Architecture** – Organized code with reusable components.  

---

## 🚀 Getting Started  

### ✅ Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (Latest LTS recommended)  
- [Git](https://git-scm.com/) (Optional, for version control)  

### 📥 Clone the Repository  
```sh
git clone https://github.com/reza-ghadimi/my-react-playground-projects.git
cd my-react-playground-projects/code/tic-tac-toe
```

### 📦 Install Dependencies  
```sh
npm install
```

### ▶️ Run the Project  
```sh
npm run dev
```
The game will be available at `http://localhost:5173/` (or another available port).  

---

## 🏗️ Project Structure  

```
tic-tac-toe/
│── src/
│   ├── components/
│   │   ├── Log/
│   │   │   ├── Log.jsx
│   │   │   ├── Log.css
│   │   ├── GameBoard/
│   │   │   ├── GameBoard.jsx
│   │   │   ├── GameBoard.css
│   │   ├── Player/
│   │   │   ├── Player.jsx
│   │   │   ├── Player.css
│   ├── App.jsx
│   ├── main.jsx
│── public/
│── index.html
│── package.json
│── README.md
```

### **Component Breakdown**  
📌 **`Player/Player.jsx`** – Manages player names and symbols.  
📌 **`GameBoard/GameBoard.jsx`** – Handles the Tic-Tac-Toe board and logic.  
📌 **`Log/Log.jsx`** – Displays the history of moves.  
📌 **`App.jsx`** – Main app component integrating all parts.  

---

## 🏆 How to Play  
1️⃣ Click on an empty square to place **X** or **O**.  
2️⃣ Players take turns until one wins or the board is full.  
3️⃣ The game announces the winner or a draw.  
4️⃣ The **Game Log** records each move.  
5️⃣ Click **Restart** to play again!  

---

## 🛠️ Future Enhancements  
🔹 **AI Opponent** – Implement a simple bot to play against.  
🔹 **Animations** – Improve UI experience with smooth transitions.  
🔹 **Scoreboard** – Keep track of wins and losses.  

---

Enjoy the game and feel free to contribute! 🎉 Let me know if you need any modifications! 🚀