from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load environment variables and set up the OpenAI client
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/api/chat', methods=['POST'])
def chat_with_gpt():
    data = request.json
    user_message = data['message']

    try:
        # Call the OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are an expert at analyzing food menus. Analyze menus, structure them, and answer questions about them."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500
        )

        # Extract the assistant's reply
        assistant_response = response.choices[0].message.content

        return jsonify({"message": assistant_response})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred while processing your request"}), 500

if __name__ == '__main__':
    app.run(debug=True)