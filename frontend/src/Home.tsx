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

type Message = {
  user: "me" | "them";
  text: string;
  id: number;
};

export default function Home() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [lastChangedIndex, setLastChangedIndex] = useState(null);
  const [input, setInput] = useState("");

  function trySendMessage() {
    if (input != "") {
      addMessage(input, "me");
      setInput("");
    }
  }

  function addMessage(content: string, user: "me" | "them") {
    let id = messages.length ? Math.max(...messages.map((m) => m.id)) + 1 : 1;
    let message: Message = {
      id: id,
      user: user,
      text: content,
    };
    setMessages([message, ...messages]);
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
                duration: lastChangedIndex ? index * 0.09 + 0.4 : 1,
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
                } px-3 py-1 bg-blue-500 text-white text-left rounded-full select-none`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {message.text}
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                trySendMessage();
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
