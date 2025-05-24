# Simple AI Chatbot Free

A simple AI chatbot with a web interface that communicates with language models via the OpenRouter API.

## Features

- Elegant, responsive user interface
- Clear distinction between user messages and bot responses
- Animated loading indicator during response processing
- Chat history saved in browser memory (localStorage)
- Automatic addition of "respond in Polish" instruction to queries
- Scrollable chat window with fixed height

## Project Structure

```
simple-ai-chatbot-free/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── backend/
    ├── app.py
    ├── requirements.txt
    ├── .env.example
    └── .env (not included in the repository)
```

## Technical Requirements

### Frontend
- HTML5, CSS3, and vanilla JavaScript (no frameworks)
- Responsive design adapted to different screen sizes

### Backend
- Python 3.8+
- Flask
- Flask-CORS
- Requests
- python-dotenv

## Installation and Setup

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the required libraries:
   ```
   pip install -r requirements.txt
   ```

3. Copy the .env.example file to .env:
   ```
   cp .env.example .env
   ```

4. Edit the .env file and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key
   ```

5. Run the Flask server:
   ```
   python app.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Run a simple HTTP server:
   ```
   python -m http.server 8000
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## How to Get an OpenRouter API Key

1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Go to the API panel and generate your key
3. Add the key to the .env file in the backend directory

## License

MIT
