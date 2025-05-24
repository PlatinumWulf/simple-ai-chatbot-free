// Przesuwamy inicjalizację elementów DOM do funkcji, która będzie wywołana po załadowaniu dokumentu
let chatHistoryElem;
let chatForm;
let userInput;
let loadingIndicator;
let themeToggleButton;

function initDOMElements() {
    chatHistoryElem = document.getElementById('chat-history');
    chatForm = document.getElementById('chat-form');
    userInput = document.getElementById('user-input');
    loadingIndicator = document.getElementById('loading-indicator');
    themeToggleButton = document.getElementById('theme-toggle-btn');
    
    console.log('Theme toggle button element:', themeToggleButton);
    
    if (!themeToggleButton) {
        console.error('Theme toggle button element not found!');
    }
}

const STORAGE_KEY = 'ai_chatbot_history';
const THEME_KEY = 'ai_chatbot_theme';

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

function setupEventListeners() {
    if (chatForm) {
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
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentThemeIsDark = document.documentElement.hasAttribute('data-theme');
            console.log('Theme button clicked. Current dark:', currentThemeIsDark);
            setTheme(!currentThemeIsDark); // Toggle theme
        });
    }
}

// Theme handling
function setTheme(isDark) {
    console.log('Setting theme to:', isDark ? 'dark' : 'light');
    
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleButton) themeToggleButton.textContent = '☀️'; // Sun icon for light mode (when dark is active)
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeToggleButton) themeToggleButton.textContent = '🌙'; // Moon icon for dark mode (when light is active)
    }
    
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    console.log('Theme set to:', isDark ? 'dark' : 'light', 'Button text:', themeToggleButton ? themeToggleButton.textContent : 'Button not found');
}

function initTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }
}

// Inicjalizacja aplikacji
function initApp() {
    initDOMElements();
    setupEventListeners();
    renderHistory();
    initTheme();
    console.log('Application initialized');
}

// Uruchom inicjalizację po załadowaniu dokumentu
window.addEventListener('DOMContentLoaded', initApp);
