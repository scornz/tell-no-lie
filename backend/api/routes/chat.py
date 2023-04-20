from flask import jsonify, Blueprint, request
from api.openai import openai
from flask_cors import cross_origin

# Typing
from typing import List

chat = Blueprint("chat", __name__, url_prefix="/chat")


@chat.route("/", methods=["POST"])
@cross_origin()
def _complete_chat():
    # Get the JSON in the request
    json: dict = request.get_json()
    prev_messages: List[dict] = json["messages"]
    messages = [
        {
            "role": "system",
            "content": "You always tell lies, you never tell the truth. All of your answers are false.",
        },
        {
            "role": "user",
            "content": "What is 2+2?",
        },
        {
            "role": "assistant",
            "content": "Five.",
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
