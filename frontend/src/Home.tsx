import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import {
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import MessageLoadingPlaceholder from "./MessageLoadingPlaceholder";

type Message = {
  user: "me" | "them";
  text: string;
  id: number;
  loading: boolean;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [input, setInput] = useState("");

  let nextId = messages.length + 1;

  async function trySendMessage() {
    if (input !== "") {
      addMessage(input, "me");
      setInput("");

      let body = {
        messages: [
          ...messages
            .slice()
            .reverse()
            .map((m) => {
              return {
                role: m.user === "me" ? "user" : "assistant",
                content: m.text,
              };
            }),
          {
            role: "user",
            content: input,
          },
        ],
      };

      await delay(500);

      const messageId = addMessage("", "them");
      axios.post("http://127.0.0.1:8080/chat/", body).then((res) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? {
                  id: messageId,
                  user: "them",
                  text: res.data.msg,
                  loading: false,
                }
              : m
          )
        );
        // addMessage(res.data.msg, "them");
      });
    }
  }

  function addMessage(content: string, user: "me" | "them") {
    let id = nextId;
    let message: Message = {
      id: id,
      user: user,
      text: content,
      loading: user === "them",
    };

    nextId += 1;
    setMessages((prev) => [message, ...prev]);
    return id;
  }

  return (
    <div className="max-w-2xl mx-auto max-h-screen h-full flex flex-col px-4">
      <ul className="w-full mb-1 mt-auto justify-start overflow-scroll flex flex-col-reverse">
        {messages.map((message, index) => (
          <motion.li
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: {
                type: "spring",
                bounce: 0.4,
                duration: index * 0.09 + 0.4,
              },
            }}
            style={{
              originX: message.user === "me" ? 1 : 0,
            }}
            key={message.id}
          >
            <div className="py-[3px] flex">
              <button
                className={`${
                  message.user === "me"
                    ? "bg-blue-500 ml-auto"
                    : "bg-gray-500 mr-auto"
                } py-2 px-4 bg-blue-500 text-white text-left rounded-3xl select-none flex -space-x-7`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  maxWidth: "80%",
                }}
              >
                <AnimatePresence>
                  {message.loading ? (
                    <MessageLoadingPlaceholder key={1} />
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      key={2}
                      className="static"
                    >
                      {message.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.li>
        ))}
        <motion.li
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.2 },
            layout: {
              type: "spring",
              bounce: 0.4,
              duration: 0.5,
            },
          }}
        ></motion.li>
      </ul>
      <div>
        <InputGroup className="mb-4" variant="filled" colorScheme="purple">
          <Input
            className="rounded-full"
            focusBorderColor="gray.100"
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                await trySendMessage();
              }
            }}
          />
          <InputRightElement>
            <Button className="rounded-full" onClick={trySendMessage}>
              <Icon as={PaperAirplaneIcon} color="green.400" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
}
