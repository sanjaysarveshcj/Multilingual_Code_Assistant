from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

CODEGEN_API_URL = "https://api-inference.huggingface.co/models/Salesforce/codet5-base"

TRANSLATION_MODELS = {
    "en-de": "Helsinki-NLP/opus-mt-en-de",
    "de-en": "Helsinki-NLP/opus-mt-de-en",
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
    "fr-en": "Helsinki-NLP/opus-mt-fr-en",
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "es-en": "Helsinki-NLP/opus-mt-es-en",
    "en-it": "Helsinki-NLP/opus-mt-en-it",
    "it-en": "Helsinki-NLP/opus-mt-it-en",
    "en-zh": "Helsinki-NLP/opus-mt-en-zh",
    "zh-en": "Helsinki-NLP/opus-mt-zh-en",
    "en-ru": "Helsinki-NLP/opus-mt-en-ru",
    "en-ar": "Helsinki-NLP/opus-mt-en-ar",
    "en-ja": "Helsinki-NLP/opus-mt-en-ja",
    "en-ko": "Helsinki-NLP/opus-mt-en-ko",
    "en-hi": "Helsinki-NLP/opus-mt-en-hi",
    "en-tr": "Helsinki-NLP/opus-mt-en-tr",
    "en-pt": "Helsinki-NLP/opus-mt-en-pt",
    "en-pl": "Helsinki-NLP/opus-mt-en-pl",
    "en-ro": "Helsinki-NLP/opus-mt-en-ro",
    "en-sv": "Helsinki-NLP/opus-mt-en-sv",
    "en-fi": "Helsinki-NLP/opus-mt-en-fi",
    "en-nl": "Helsinki-NLP/opus-mt-en-nl",
    "en-cs": "Helsinki-NLP/opus-mt-en-cs",
    "en-he": "Helsinki-NLP/opus-mt-en-he",
    "en-el": "Helsinki-NLP/opus-mt-en-el",
    "en-da": "Helsinki-NLP/opus-mt-en-da",
    "en-no": "Helsinki-NLP/opus-mt-en-no",
    "en-id": "Helsinki-NLP/opus-mt-en-id",
    "en-ms": "Helsinki-NLP/opus-mt-en-ms",
    "en-th": "Helsinki-NLP/opus-mt-en-th",
    "en-vi": "Helsinki-NLP/opus-mt-en-vi",
    "de-en": "Helsinki-NLP/opus-mt-de-en",
    "fr-en": "Helsinki-NLP/opus-mt-fr-en",
    "es-en": "Helsinki-NLP/opus-mt-es-en",
    "it-en": "Helsinki-NLP/opus-mt-it-en",
    "ru-en": "Helsinki-NLP/opus-mt-ru-en",
    "zh-en": "Helsinki-NLP/opus-mt-zh-en",
    "ja-en": "Helsinki-NLP/opus-mt-ja-en",
    "ko-en": "Helsinki-NLP/opus-mt-ko-en",
    "ar-en": "Helsinki-NLP/opus-mt-ar-en",
    "hi-en": "Helsinki-NLP/opus-mt-hi-en",
    "tr-en": "Helsinki-NLP/opus-mt-tr-en",
    "pt-en": "Helsinki-NLP/opus-mt-pt-en",
    "pl-en": "Helsinki-NLP/opus-mt-pl-en",
    "ro-en": "Helsinki-NLP/opus-mt-ro-en",
    "sv-en": "Helsinki-NLP/opus-mt-sv-en",
    "fi-en": "Helsinki-NLP/opus-mt-fi-en",
    "nl-en": "Helsinki-NLP/opus-mt-nl-en",
    "cs-en": "Helsinki-NLP/opus-mt-cs-en",
    "he-en": "Helsinki-NLP/opus-mt-he-en",
    "el-en": "Helsinki-NLP/opus-mt-el-en",
    "da-en": "Helsinki-NLP/opus-mt-da-en",
    "no-en": "Helsinki-NLP/opus-mt-no-en",
    "id-en": "Helsinki-NLP/opus-mt-id-en",
    "ms-en": "Helsinki-NLP/opus-mt-ms-en",
    "th-en": "Helsinki-NLP/opus-mt-th-en",
    "vi-en": "Helsinki-NLP/opus-mt-vi-en",
    "en-ta": "Mr-Vicky-01/English-Tamil-Translator",
    "ta-en": "Mr-Vicky-01/English-Tamil-Translator",



    
}

HF_API_KEY = os.getenv("HF_API_KEY", "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")

headers = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}

@app.route('/')
def home():
    return "Server running on port 5000"

@app.route('/analyze-code', methods=['POST'])
def analyze_code():
    data = request.get_json()

    if not data or 'code' not in data:
        return jsonify({
            "status": "error",
            "message": "Missing 'code' in request",
            "details": None
        }), 400

    code = data['code']

    payload = {
        "inputs": code,
    }

    response = requests.post(CODEGEN_API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        output = response.json()
        if isinstance(output, list):
            suggestion = output[0].get("generated_text", "No suggestions available.")
        else:
            suggestion = output.get("suggestions", "No suggestions available.")
        return jsonify({"suggestions": suggestion}), 200
    else:
        return jsonify({"error": "Failed to fetch data from model", "details": response.text}), response.status_code


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json

    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' in request"}), 400
    if 'source_lang' not in data or 'target_lang' not in data:
        return jsonify({"error": "Missing 'source_lang' or 'target_lang' in request"}), 400

    text = data['text']
    source_lang = data['source_lang']
    target_lang = data['target_lang']

    language_pair = f"{source_lang}-{target_lang}"

    if 'ta' in (source_lang, target_lang):
        translation_model_url = f"https://api-inference.huggingface.co/models/Mr-Vicky-01/English-Tamil-Translator?trust_remote_code=true"
    else:
        language_pair = f"{source_lang}-{target_lang}"
        if language_pair not in TRANSLATION_MODELS:
            return jsonify({"error": f"Unsupported language pair: {language_pair}"}), 400
        translation_model_url = f"https://api-inference.huggingface.co/models/{TRANSLATION_MODELS[language_pair]}"

    retries = 5
    for _ in range(retries):
        response = requests.post(translation_model_url, headers=headers, json={"inputs": text, "trust_remote_code": True})
        if response.status_code == 200:
            result = response.json()
            
            if isinstance(result, list) and len(result) > 0:
                translated_text = result[0].get("translation_text", result[0].get("translation", "No translation available."))
            else:
                translated_text = "No translation available."
                
            return jsonify({"translatedText": translated_text})
        elif response.status_code == 503:
            print("Model is loading... waiting to retry.")
            time.sleep(5)
        else:
            print(f"Error Code: {response.status_code}, Response: {response.text}")
            return jsonify({"error": "Error translating the text", "details": response.text}), response.status_code

    return jsonify({"error": "Model is still not ready after multiple attempts."}), 503


if __name__ == '__main__':
    app.run(port=5000, debug=True)



