import axios from "axios";
import { BASE_URL } from ".";
import { MessageInfo } from "../components/Message";

/**
 * Submit a message, from the user. Map all existing messages to a body, either
 * from user or assistant, according to OpenAI's specifications.
 */
export async function submitMessage(
  content: string,
  messages: Array<MessageInfo>
): Promise<string> {
  let body = {
    messages: [
      ...messages
        .slice()
        .reverse()
        .filter((m) => m.include)
        .map((m) => {
          return {
            role: m.user === "me" ? "user" : "assistant",
            content: m.text,
          };
        }),
      {
        role: "user",
        content: content,
      },
    ],
  };

  let res = await axios.post(`${BASE_URL}/chat/`, body);
  return res.data.msg;
}
