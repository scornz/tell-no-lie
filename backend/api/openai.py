import openai
from os import environ

openai.api_key = environ["OPENAI_API_KEY"]
