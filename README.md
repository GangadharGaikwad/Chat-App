/* README.md */
# Real-Time Chat Application

A simple real-time chat application built with React, Socket.IO, and Express. This application allows users to join a chat room, send messages in real-time, and see who's online.

## Features

- 🚀 Real-time messaging
- 👥 Online users list
- 🔔 Join/Leave notifications
- 💫 Clean and modern UI
- 📱 Responsive design

## Tech Stack

### Frontend
- React (Vite)
- Chakra UI for styling
- Socket.IO Client
- React Icons

### Backend
- Node.js
- Express
- Socket.IO
- CORS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd chat-app
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```
The server will start on http://localhost:3000

2. Start the frontend development server
```bash
cd client
npm run dev
```
The client will start on http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Enter your name to join the chat
3. Start chatting!

## Features Explained

- **Real-time Communication**: Uses Socket.IO for instant message delivery
- **User Status**: Shows when users join or leave the chat
- **Online Users**: Displays a list of currently active users
- **Message Types**: Supports user messages and system notifications
- **Responsive Design**: Works on both desktop and mobile devices

## Project Structure

```
chat-app/
├── client/                # Frontend
│   ├── src/
│   │   ├── App.jsx       # Main app logic
│   │   └── components/
│   │       ├── ChatRoom.jsx    # Chat interface
│   │       └── JoinChat.jsx    # Login screen
│   └── package.json
│
└── server/               # Backend
    ├── server.js        # Socket.io server
    └── package.json
```

## Contributing

Feel free to fork this project and make improvements. Pull requests are welcome!