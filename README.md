# Simple AI Chatbot

Prosty chatbot AI z interfejsem webowym, który komunikuje się z modelami językowymi poprzez API OpenRouter.

## Funkcjonalności

- Elegancki, responsywny interfejs użytkownika
- Wyraźne rozróżnienie między wiadomościami użytkownika a odpowiedziami bota
- Animowany wskaźnik ładowania podczas przetwarzania odpowiedzi
- Historia czatu zapisywana w pamięci przeglądarki (localStorage)
- Automatyczne dodawanie instrukcji "odpowiadaj po polsku" do zapytań
- Przewijalne okno czatu o stałej wysokości

## Struktura projektu

```
simple-ai-bot/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── backend/
    ├── app.py
    ├── requirements.txt
    ├── .env.example
    └── .env (nie dołączony do repozytorium)
```

## Wymagania techniczne

### Frontend
- HTML5, CSS3 i vanilla JavaScript (bez frameworków)
- Responsywny design dostosowany do różnych rozmiarów ekranów

### Backend
- Python 3.8+
- Flask
- Flask-CORS
- Requests

## Instalacja i uruchomienie

### Backend

1. Przejdź do katalogu backend:
   ```
   cd backend
   ```

2. Zainstaluj wymagane biblioteki:
   ```
   pip install -r requirements.txt
   ```

3. Skopiuj plik .env.example do .env:
   ```
   cp .env.example .env
   ```

4. Edytuj plik .env i dodaj swój klucz API OpenRouter:
   ```
   OPENROUTER_API_KEY=twój_klucz_api
   ```

5. Uruchom serwer Flask:
   ```
   python app.py
   ```

### Frontend

1. Przejdź do katalogu frontend:
   ```
   cd frontend
   ```

2. Uruchom prosty serwer HTTP:
   ```
   python -m http.server 8000
   ```

3. Otwórz przeglądarkę i przejdź do:
   ```
   http://localhost:8000
   ```

## Jak uzyskać klucz API OpenRouter

1. Zarejestruj się na stronie [OpenRouter](https://openrouter.ai/)
2. Przejdź do panelu API i wygeneruj swój klucz
3. Dodaj klucz do pliku .env w katalogu backend

## Licencja

MIT
