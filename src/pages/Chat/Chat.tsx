import React, { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import { formatTime } from '../../utils/utils';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import IconButton from '../../components/IconButton/IconButton';
import io from 'socket.io-client';
import SendIcon from '../../components/Icons/SendIcon';
import PlusIcon from '../../components/Icons/PlusIcon';
import ProfileIcon from '../../components/Icons/ProfileIcon';
import { Conversation } from '../../interfaces/conversation';
import { Message, MessagePackage } from '../../interfaces/message';
import { AddConversation, FetchConversations } from '../../apis/conversation';
import { FetchMessages, SendMessage } from '../../apis/message';
import { MessageBox } from '../../components/Chat/MessageBox/MessageBox';
import { MessageBubble } from '../../components/Chat/MessageBubble/MessageBubble';
import { Contact } from '../../components/Chat/Contact/Contact';

const socket = io('http://localhost:5000');

const Chat: React.FC = () => {
  const [createChatInput, setCreateChatInput] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [newConversationError, setNewConversationError] = useState('');

  const emitMessage = (message: Message) => {
    socket.emit(
      'message', { message, conversationId: selectedConversation?.id });
  }

  useEffect(() => {
    socket.on('message', (message: MessagePackage) => {
      setChatMessages(prevChatMessages => [...prevChatMessages, message.message]);
    });

    socket.on('conversation', (data: Conversation) => {
      setConversations(prevConversations => [...prevConversations, data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    FetchConversations()
      .then((data) => {
        setConversations(data);
      })
      .catch((error) => {
        console.log("Error fetching conversations", error);
      });
    socket.emit('joinWithToken', localStorage.getItem("auth-token") || "");
  }, []);

  useEffect(() => {
    if (!selectedConversation) return;
    FetchMessages(selectedConversation?.id)
      .then((data) => {
        setChatMessages(data);
      })
      .catch((error) => {
        console.log("Error fetching messages", error);
      });
    socket.emit('join', selectedConversation?.id);
  }, [selectedConversation]);

  const sendMessage = () => {
    if (chatInput.trim() === '') return;

    const newMessage = {
      conversationId: selectedConversation?.id || "",
      content: chatInput,
    } as Message;

    setChatInput('');

    SendMessage(newMessage)
      .then((data) => {
        emitMessage(data);
        setChatMessages(prevChatMessages => [...prevChatMessages, data]);
      })
      .catch((error) => {
        console.log("Error sending message", error);
      });
  }

  const addConversation = () => {
    if (createChatInput.trim() === '') return;

    setCreateChatInput('');

    AddConversation({ username: createChatInput })
      .then((data) => {
        setNewConversationError('');
        setConversations(prevConversations => [...prevConversations, data]);
      })
      .catch((error) => {
        setNewConversationError(error.message);
      });
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className='chat'>
      <div>
        <div className='chat__create-container'>
          <div className='chat__create'>
            <Input value={createChatInput} type='text' onChange={(e) => setCreateChatInput(e.target.value)} onSubmit={addConversation} placeholder='Add new contact' />
            <IconButton onClick={addConversation} Icon={PlusIcon} />
          </div>
          <span className={`error`}>{newConversationError}</span>
        </div>
        <ul>
          {
            conversations?.map((conversation: Conversation) => {
              return (
                <Contact id={conversation.id} selected={selectedConversation?.id === conversation.id} contactName={conversation.contactName} lastMessage={conversation.lastMessage} contactId={conversation.contactId} onClick={() => setSelectedConversation(conversation)} />
              )
            })
          }
        </ul>
      </div>
      <div className='chat__box'>
        <div className='chat__messages' ref={scrollContainerRef}>
          {
            chatMessages?.map((message, index) => {
              const isSameSender = (index > 0 && chatMessages[index - 1].sender === message.sender);

              return (
                <MessageBubble
                  id={message.id}
                  sender={message.sender}
                  message={message.content}
                  timeSent={message.timeSent}
                  isSameSender={isSameSender}
                  contactId={selectedConversation?.contactId || ""}
                  contactName={selectedConversation?.contactName || ""}
                />
              )
            })
          }
        </div>
        <div className={`${selectedConversation ? '' : 'chat__hidden'}`}>
          <MessageBox value={chatInput} onChange={setChatInput} onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;