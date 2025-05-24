import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv

# Załaduj zmienne środowiskowe z pliku .env, jeśli istnieje
load_dotenv()

app = Flask(__name__)
CORS(app)  # Pozwala na komunikację z frontendem (np. localhost:3000 lub 127.0.0.1:5500)

# Pobierz klucz API OpenRouter z zmiennych środowiskowych
OPENROUTER_API_KEY = os.environ.get('OPENROUTER_API_KEY', 'sk-demo-REPLACE_ME')
OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Brak wiadomości w żądaniu.'}), 400

        user_message = data['message']
        # Dodaj instrukcję "odpowiadaj po polsku" do wiadomości użytkownika
        enhanced_message = f"{user_message}\n\nOdpowiadaj po polsku."
        
        # Przygotuj payload do OpenRouter (model DeepSeek Chat v3 - darmowy)
        payload = {
            "model": "deepseek/deepseek-chat-v3-0324:free",
            "messages": [
                {"role": "user", "content": enhanced_message}
            ]
        }
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        print(f"Wysyłanie zapytania do OpenRouter z kluczem: {OPENROUTER_API_KEY[:10]}...")
        print(f"Payload: {json.dumps(payload)}")
        try:
            # Wyślij zapytanie do OpenRouter
            response = requests.post(OPENROUTER_API_URL, json=payload, headers=headers, timeout=15)
            print(f"Status odpowiedzi: {response.status_code}")
            
            # Sprawdź czy odpowiedź jest poprawna
            response.raise_for_status()
            
            # Parsuj odpowiedź JSON
            api_data = response.json()
            print(f"Otrzymano odpowiedź: {json.dumps(api_data)[:100]}...")
            
            # Wyciągnij odpowiedź modelu
            bot_reply = api_data['choices'][0]['message']['content']
            return jsonify({'response': bot_reply})
        except requests.exceptions.RequestException as e:
            print(f"Błąd zapytania: {str(e)}")
            # Jeśli mamy odpowiedź, spróbujmy wyświetlić jej treść
            if hasattr(e, 'response') and e.response is not None:
                print(f"Treść odpowiedzi błędu: {e.response.text}")
            raise
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Błąd komunikacji z OpenRouter API.', 'details': str(e)}), 502
    except Exception as e:
        return jsonify({'error': 'Wystąpił błąd serwera.', 'details': str(e)}), 500

if __name__ == '__main__':
    # Uruchom serwer na localhost:5000
    app.run(host='0.0.0.0', port=5000, debug=True)

"""
INSTRUKCJA POZYSKANIA KLUCZA API OPENROUTER:
1. Zarejestruj się na stronie https://openrouter.ai/
2. Przejdź do panelu API i wygeneruj swój klucz.
3. Utwórz plik .env w katalogu backend i dodaj linię:
   OPENROUTER_API_KEY=sk-...
4. Przed uruchomieniem backendu załaduj zmienne środowiskowe:
   Linux/macOS: export OPENROUTER_API_KEY=sk-...
   Windows: set OPENROUTER_API_KEY=sk-...
"""
