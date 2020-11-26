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
  bottom: 0;
  right: 0;
  width: 20%;
  text-align: left;
  z-index: 300;
  font-size: 18px;
  border-radius: 50px;
  border: ${({ newMessage, theme }) =>
    newMessage
      ? css`1px ${colorToString(theme.buttonAttentionBackground)} solid`
      : css`1px solid ${colorToString(theme.border)}`};
  background: ${({ newMessage, theme }) =>
    newMessage ? colorToString(theme.buttonAttentionBackground) : 'transparent'};
  color: ${({ newMessage, theme }) =>
    newMessage ? colorToString(theme.buttonAttentionText) : colorToString(theme.border)};
  padding: 5px 15px;
  :focus {
    outline: 0;
  }
  svg {
    fill: ${({ newMessage, theme }) =>
      newMessage ? colorToString(theme.buttonActionText) : colorToString(theme.foreground)};
    vertical-align: middle;
    font-size: 20px;
    margin-right: 5px;
    :last-of-type {
      margin-left: 8px;
      opacity: ${({ isTyping }) => (isTyping ? 1 : 0)};
      font-size: 24px;
      float: right;
    }
  }
  ${mq.MOBILE} {
    padding-bottom: 20px;
    width: 100%;
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
                <KeyboardArrowUpIcon />
                {unreadCount > 0 ? <UnreadChatIcon /> : <ChatIcon />}
                <span>Chat{unreadCount ? ` (${unreadCount})` : ''}</span>
                <MoreHorizIcon />
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
