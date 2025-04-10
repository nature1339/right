import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "utils/api";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import userStore from "store/user";
import Head from "@components/head";
import { useTranslation } from "react-i18next";

export default function Counseling() {
  const { t } = useTranslation();
  const { userInfo } = userStore();
  const userId = userInfo?.userid;

  const [activation, setActivation] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const stompClientRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);

  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  useEffect(() => {
    if (messages.length > 0) {
      return;
    }

    if (!chats) {
      return;
    }
    const formattedChats = chats.map((chat) => ({
      ...chat,
      timestamp: new Date(chat.timestamp).toISOString(),
    }));
    setMessages((prevMessages) => [...prevMessages, ...formattedChats]);
  }, [chats]);

  useEffect(() => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      return;
    }

    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ws/chat`
      // `${window.location.origin}/api/v1/ws/chat`
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });

    stompClient.onConnect = () => {
      heartbeatIntervalRef.current = setInterval(() => {
        if (stompClient.connected) {
          stompClient.publish({
            destination: "/app/chat.alam",
            body: JSON.stringify({
              content: userId + "대화요청",
              sender: userId,
            }),
          });
        }
      }, 4000);

      stompClient.subscribe(`/topic/${userId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...newMessage,
            timestamp: new Date().toISOString(),
          },
        ]);
      });
    };

    stompClient.onStompError = (error) => {
      console.error("STOMP Error:", error);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
  }, [userId]);

  const sendMessageToAdmin = (messageContent) => {
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      return;
    }

    stompClientRef.current.publish({
      destination: "/app/message",
      body: JSON.stringify({
        content: messageContent,
        sender: userId,
        receiver: "admin",
      }),
    });

    const now = new Date();
    const newMessage = {
      content: messageContent,
      sender: userId,
      timestamp: now.toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessageToAdmin(inputValue.trim());
      setInputValue("");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleCounseling = () => {
    setActivation((prev) => !prev);
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp).toLocaleDateString(
        "ko-KR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(message); // Reverse order by using unshift
    });
    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <>
      <Head title={t("상담센터")} />
      <main>
        <section className="sub_page_section counseling st_2">
          <div className="contact_wrap dp_block">
            <h2 className="align-l pb-0">{t("상담센터")}</h2>
            <div className="notice_wrap">
              <hr />
            </div>
            <div className="inner">
              <div
                className={`start-btn-container ${!activation ? "active" : ""}`}
              >
                <div className="start-btn-wrap">
                  <button
                    className="gradient_btn start-btn active"
                    onClick={handleCounseling}
                  >
                    {t("문의하기")}
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </div>
              {activation && (
                <>
                  <div className="message_box active">
                    <div className="message_box_content">
                      {Object.entries(groupedMessages).map(
                        ([date, messages]) => (
                          <React.Fragment key={messages.id}>
                            <div className="PreviousDate">{date}</div>
                            {messages.map((message, index) => (
                              <>
                                <div
                                  key={index}
                                  className={`msg ${
                                    message.sender === userId
                                      ? "me !bg-primary"
                                      : "center"
                                  }`}
                                >
                                  {message.sender !== userId && (
                                    <div className="block absolute top-[-2.7rem] left-[0.25rem] font-medium whitespace-nowrap">
                                      {t("고객센터")}
                                    </div>
                                  )}
                                  <span
                                    className="content"
                                    dangerouslySetInnerHTML={{
                                      __html: message.content,
                                    }}
                                  ></span>
                                  <span className="date">
                                    {new Date(
                                      message.timestamp
                                    ).toLocaleTimeString("ko-KR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                              </>
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </div>
                  </div>
                  <div className="send_box">
                    <input
                      type="text"
                      placeholder={t("문의내용을 입력해주세요")}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={onKeyPress}
                    />
                    <button
                      className="send-btn !bg-primary"
                      onClick={handleSend}
                    >
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
