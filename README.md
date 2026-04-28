# Wordcraft AI ✍️

Wordcraft AI is a modern web application designed to help you craft better words effortlessly. Whether you're drafting a formal email, a casual social media post, or professional documentation, Wordcraft uses AI to transform your text into the perfect tone.

## 🚀 The Motive

In the digital age, **tone is everything**. A message intended to be professional can sometimes come across as cold, or a casual note might seem unprofessional. Wordcraft was built to bridge this gap, providing a simple, intuitive workspace where users can experiment with different writing styles and ensure their message hits the right note every time.

The goal is to provide a "premium writing assistant" experience that is fast, accessible, and distraction-free.

## 🛠 How It Works

Wordcraft is built with a modern tech stack to ensure performance and a seamless user experience:

### 🎨 Frontend
- **Next.js (App Router):** Provides a robust, server-side rendered foundation with optimized routing.
- **Tailwind CSS:** Powers the "Premium Dark Theme" UI, ensuring a sleek, responsive, and accessible design.
- **React State Management:** Manages real-time input/output and loading states for a snappy feel.

### 🧠 Backend & AI
- **Next.js API Routes:** Handles the logic for communicating with external AI services securely.
- **OpenRouter Integration:** Connects to powerful Large Language Models (LLMs) via OpenRouter.
- **Tone Processing:** The backend constructs a specialized "Editor Prompt" that instructs the AI to maintain the core meaning while surgically adjusting vocabulary, structure, and style to match the user's selected tone.

### 🔄 The Workflow
1. **Input:** Paste or type your text into the input editor.
2. **Select Tone:** Choose from various modes (Professional, Casual, Friendly, etc.).
3. **Rewrite:** Click the rewrite button to trigger the AI processing.
4. **Output:** Review the AI-generated version in the output pane, optimized for your chosen tone.

---

## ⚡️ Getting Started

### Prerequisites
- Node.js 18+ 
- An [OpenRouter](https://openrouter.ai/) API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wordcraft.git
   ```

2. Install dependencies:
   ```bash
   npm install # or yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root and add:
   ```env
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://wordcraft-mqfz.vercel.app](http://wordcraft-mqfz.vercel.app) to start crafting!

---

## 🏗 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components/ui`: Reusable, atomic UI components (Select, Header, Alert).
- `/components/editor`: Feature-specific components for the workspace.
- `/components/workspace`: The main application logic and layout.

---

Built with ❤️ for better communication.
