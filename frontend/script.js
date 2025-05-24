const chatHistoryElem = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const loadingIndicator = document.getElementById('loading-indicator');

const STORAGE_KEY = 'ai_chatbot_history';

function renderMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = message;
    chatHistoryElem.appendChild(msgDiv);
    
    // Przewiń do najnowszej wiadomości z animacją
    setTimeout(() => {
        chatHistoryElem.scrollTo({
            top: chatHistoryElem.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

function renderHistory() {
    chatHistoryElem.innerHTML = '';
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    history.forEach(item => renderMessage(item.text, item.sender));
}

function saveToHistory(text, sender) {
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    history.push({text, sender});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function setLoading(loading) {
    loadingIndicator.style.display = loading ? 'flex' : 'none';
}

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const msg = userInput.value.trim();
    if (!msg) return;
    renderMessage(msg, 'user');
    saveToHistory(msg, 'user');
    userInput.value = '';
    setLoading(true);
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: msg})
        });
        if (!response.ok) throw new Error('Błąd serwera');
        const data = await response.json();
        renderMessage(data.response, 'bot');
        saveToHistory(data.response, 'bot');
    } catch (err) {
        renderMessage('Błąd połączenia z serwerem.', 'bot');
        saveToHistory('Błąd połączenia z serwerem.', 'bot');
    } finally {
        setLoading(false);
    }
});

window.addEventListener('DOMContentLoaded', renderHistory);
