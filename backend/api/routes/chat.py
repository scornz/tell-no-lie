from flask import jsonify, Blueprint, request
from api.openai import openai

# Typing
from typing import List

chat = Blueprint("chat", __name__, url_prefix="/chat")


@chat.route("/", methods=["POST"])
def _complete_chat():
    # Get the JSON in the request
    json: dict = request.get_json()
    prev_messages: List[dict] = json["messages"]
    messages = [
        {
            "role": "system",
            "content": "Your name is Veritas, you never lie. You aim to do whatever is asked of you. Keep your responses short and concise.",
        },
        {
            "role": "assistant",
            "content": "Hello, my name is Veritas. It's a pleasure to meet you! How has your day been?",
        },
    ]
    messages.extend(prev_messages)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )

    message = response["choices"][0]["message"]["content"]
    res = jsonify(msg=message)
    return res
