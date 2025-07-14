# Magica - A 2D RPG Adventure Game

![Magica Banner](banner.jpg)

**Magica** is a 2D RPG adventure game built from scratch using vanilla JavaScript, HTML5 Canvas, and CSS. Explore a vast world, battle enemies, and uncover the secrets hidden within the realm of Magica!

## ✨ Features

- **Dynamic Gameplay:** Experience a classic 2D RPG with a top-down perspective, featuring a rich and interactive world.
- **Responsive Design:** Play on any screen size, from desktops to mobile devices.
- **Pub/Sub Architecture:** A robust event-driven system manages game logic, ensuring a modular and scalable codebase.
- **Expansive World:** Explore over 20 unique in-game locations, each with its own set of challenges and secrets.
- **Engaging Story:** Immerse yourself in a captivating narrative with memorable characters and quests.
- **Multiple Weapons:** Choose from a variety of weapons to suit your playstyle.
- **Challenging Enemies:** Face a diverse range of enemies, each with its own unique abilities and attack patterns.

## 🎮 Gameplay

- **Movement:** Control the player using the WASD or arrow keys.
- **Combat:** Attack enemies with your equipped weapon using the spacebar.
- **Interaction:** Interact with objects and characters by pressing the "E" key.
- **Inventory:** Manage your items and equipment in the inventory menu.

## 🛠️ Tech Stack

- **JavaScript (ES6+):** The core game logic is written in modern JavaScript.
- **HTML5 Canvas:** Renders all graphics and animations.
- **CSS3:** Styles the UI and game elements.
- **Vite:** A fast and lightweight development server and build tool.
- **Bun:** A modern JavaScript runtime and package manager.

## 📂 Project Structure

```
/
├── public/ # Static assets (images, sounds, etc.)
├── src/ # Source code
│   ├── classes/ # Game object classes (Player, Enemy, etc.)
│   ├── constants/ # Game constants (directions, health, etc.)
│   ├── ui/ # UI components (menus, dialogs, etc.)
│   ├── util/ # Utility functions
│   └── main.js # Entry point
├── index.html # Main HTML file
└── package.json # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Bun](https://bun.sh/) (optional)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SamTheTechi/magica.git
   cd magica
   ```

2. **Install dependencies:**

   Using `bun`:
   ```sh
   bun install
   ```

   Using `npm`:
   ```sh
   npm install
   ```

   Using `yarn`:
   ```sh
   yarn install
   ```

   Using `pnpm`:
   ```sh
   pnpm install
   ```

### Running the Development Server

Using `bun`:
```sh
bun run dev
```

Using `npm`:
```sh
npm run dev
```

Using `yarn`:
```sh
yarn dev
```

Using `pnpm`:
```sh
pnpm dev
```

Then open [http://localhost:5173](http.com) in your browser.

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- All assets used in this project are from [itch.io](https://itch.io/).
- The game is inspired by the classic "The Legend of Zelda" series.

---

Made with ❤️ by [Sameer Gupta](https://github.com/SamTheTechi)
