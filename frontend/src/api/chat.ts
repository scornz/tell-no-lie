import axios from "axios";
import { BASE_URL } from ".";
import { MessageInfo } from "../components/Message";

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
