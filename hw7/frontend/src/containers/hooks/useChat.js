import { useState, useEffect, createContext, useContext } from "react";
import { message } from "antd";

const LOCALSTOGARE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTOGARE_KEY);

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  startChat: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
});

const client = new WebSocket("ws://localhost:4000");
client.onopen = () => console.log("Backend socket server connected!");

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  client.onmessage = (byteString) => {
    const [task, payload] = JSON.parse(byteString.data);
    switch (task) {
      case "init": {
        setMessages(payload);
        break;
      }
      case "output": {
        setMessages(() => [...messages, ...payload]);
        break;
      }
      case "status": {
        setStatus(payload);
        break;
      }
      case "cleared": {
        setMessages([]);
        break;
      }
      default: break;
    }
  }

  const sendData = async(data) => {
      await client.send(JSON.stringify(data));
  };
  const startChat = (name, to) => {
    if (!name || !to) throw new Error("Name or to required.");
    sendData(["CHAT", { name, to }]);
  };
  const sendMessage = (name, to, body) => {
    if (!name || !to || !body) throw new Error("name or to or body required.");
    sendData(["MESSAGE", { name, to, body }]);
  };
  const clearMessages = () => {
    sendData(["clear"]);
  };
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
  }}}

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTOGARE_KEY, me);
    }
  }, [signedIn]);

  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        signedIn,
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };