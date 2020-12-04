import { ChatComposers, ChatList, Notifications } from '@andyet/simplewebrtc';
import UnreadChatIcon from 'material-icons-svg/components/baseline/Chat';
import ChatIcon from 'material-icons-svg/components/baseline/ChatBubbleOutline';
import KeyboardArrowUpIcon from 'material-icons-svg/components/baseline/KeyboardArrowUp';
import MoreHorizIcon from 'material-icons-svg/components/baseline/MoreHoriz';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colorToString } from '../utils/colorify';
import mq from '../styles/media-queries';

interface Props {
  roomAddress: string;
  onClick: () => void;
}

interface ContainerProps {
  isTyping: boolean;
  newMessage: boolean;
}

const Container = styled.button<ContainerProps>`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 300;
  border-radius: 50%;
  font-size: 20px;
  padding-top: 5px;
  border: ${({ newMessage, theme }) =>
    newMessage
      ? css`1px ${colorToString(theme.buttonAttentionBackground)} solid`
      : css`1px solid #ffffff`};
  background: ${({ newMessage, theme }) =>
    newMessage ? colorToString(theme.buttonAttentionBackground) : 'transparent'};
  color: ${({ newMessage, theme }) =>
    newMessage ? colorToString(theme.buttonAttentionText) : "#ffffff"};
  :focus {
    outline: 0;
  }
  svg {
    fill: ${({ newMessage, theme }) =>
      newMessage ? colorToString(theme.buttonActionText) : '#ffffff'};
  }
  ${mq.MOBILE} {
  }
`;

const ChatToggle: React.SFC<Props> = ({ roomAddress, onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <ChatList
      room={roomAddress}
      render={({ groups }) => (
        <>
          <ChatComposers
            room={roomAddress}
            render={({ composers }) => (
              <Container
                onClick={onClick}
                isTyping={composers.length > 0}
                newMessage={unreadCount > 0}
              >
                {unreadCount > 0 ? <span>{unreadCount}</span> : <ChatIcon />}
              </Container>
            )}
          />
          <Notifications onChatReceived={() => setUnreadCount(unreadCount + 1)} />
        </>
      )}
    />
  );
};

export default ChatToggle;
