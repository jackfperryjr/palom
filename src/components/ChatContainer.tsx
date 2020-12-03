import {
  Chat,
  ChatComposers,
  ChatInput,
  ChatInputTextArea,
  ChatList,
  Peer,
  StayDownContainer
} from '@andyet/simplewebrtc';
import SendIcon from 'material-icons-svg/components/baseline/Chat';
import ChatIcon from 'material-icons-svg/components/baseline/ChatBubbleOutline';
import KeyboardArrowDownIcon from 'material-icons-svg/components/baseline/KeyboardArrowDown';
import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../styles/button';
import mq from '../styles/media-queries';
import { colorToString } from '../utils/colorify';
import emojify from '../utils/emojify';
import Linkify from './Linkify';

const Container = styled.div`
  position: fixed;
  padding-top: 25px;
  right: 0;
  display: flex;
  flex-direction: column;
  border-top: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  z-index: 300;
  background-color: rgba(0,0,0,.5);
  overflow: hidden;

  & .msg:last-of-type {
    border-bottom: none;
  }
  min-height: 100vh;
  max-height: 100vh;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  ${mq.SMALL_DESKTOP} {
    width: 20%;
    border-top: none;
    border-left: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  }
  ${mq.MOBILE} {
    border: none;
    width: 100%;
    padding-bottom: 20px;
  }
`;

// const staydownContainerClass = css`
//   flex: 1;
//   overflow: scroll;
//   height: 0px; /* This is important to get Flexbox to overflow properly. */
//   margin-bottom: 16px;
// `;

const Header = styled.button`
  text-align: left;
  border: 1px solid transparent;
  display: block;
  padding: 5px 15px;
  font-size: 18px;
  outline: none;
  color: #ffffff;
  background-color: transparent;
  svg {
    fill: ${({ theme }) => colorToString(theme.background)};
    vertical-align: middle;
    font-size: 20px;
    margin-right: 5px;
  }
`;

const SendButton = styled(Button)`
  border-radius: 5px;
  transition: background 200ms linear;
  font-size: 14px;
  min-height: 30px;
  min-width: 30px;
  border: none;
  color: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  background-color: ${({ theme }) => colorToString(theme.primaryBackground)};
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  :focus {
    outline: 0;
  }
  svg {
    fill: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
    vertical-align: middle;
    font-size: 20px;
    :not(:only-child) {
      margin-left: 7px;
    }
  }
  & a {
    color: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  }
  & span {
    padding-left: 3px;
    padding-right: 3px;
    margin-right: 5px;
  }
`;

const StyledStayDownContainer = styled(StayDownContainer)`
  flex: 1;
  overflow: scroll;
  height: 0px;
  marginBottom: 16px;
  color: ${({ theme }) => colorToString(theme.secondaryForeground)};
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const ChatContainerHeader = styled.div`
  border-bottom: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  text-align: center;
  color: #ffffff;
  font-size: 16px;
`

const InputContainer = styled.div`
  padding: 5px;
  border: ${({ theme }) => css`1px solid ${colorToString(theme.background)}`};
  color: ${({ theme }) => colorToString(theme.background)};
  border-radius: 5px;
  margin: 5px;

  textarea {
    width: 100%;
    height: 90px;
    min-height: 0;
    padding: 8px;
    margin: 0;
    outline: none;
    display: block;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => colorToString(theme.background)};
  }
  input {
    margin-right: 5px;
  }
  label {
    font-size: 12px;
  }

  &.chat-disabled {
    background: ${({ theme }) =>
      css`
        ${colorToString(theme.border)}
      `};

    textarea {
      background: ${({ theme }) =>
        css`
          ${colorToString(theme.border)}
        `};
    }
  }
`;

const Message = styled.div`
  position: relative;
  padding: 10px;
  font-size: 14px;
  p {
    margin: 0;
  }
`;

const MessageAuthor = styled.p({
  fontWeight: 'bolder'
});

const MessageTime = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${({ theme }) => colorToString(theme.background)};
  font-size: 12px;
`;

const MessageText = styled.p({
  color: '#ffffff',
  wordBreak: 'break-all'
});

interface ChatMessageGroupProps {
  chats: Chat[];
  peer: Peer | undefined;
}

const ChatMessageGroup: React.SFC<ChatMessageGroupProps> = ({ chats, peer }) => (
  <Message className="msg" key={chats[0].id}>
    <MessageAuthor style={ chats[0].displayName === localStorage.displayName ? {color:'#00A6A6'} : {color : '#F4845F'} }>{chats[0].displayName ? chats[0].displayName : 'Anonymous'}</MessageAuthor>
    <MessageTime>{chats[0].time.toLocaleTimeString()}</MessageTime>
    {chats.map(message => (
      <MessageText key={message.id}>
        <Linkify text={emojify(message.body)} />
      </MessageText>
    ))}
  </Message>
);

const ComposersContainer = styled.div({
  minHeight: '20px',
  fontSize: '12px',
  textAlign: 'center'
});

interface Props {
  disabled?: boolean;
  roomAddress: string;
  toggleChat: () => void;
}

// ChatContainer renders all the UI for the chat room inside a Room. It
// includes a message display embedded inside a StayDownContainer so that
// it remains scrolled to the bottom, a ChatInput to type messages, and a
// text element that displays currently typing peers.
const ChatContainer: React.SFC<Props> = ({ roomAddress, toggleChat, disabled }) => (
  <Container>
    <ChatContainerHeader>Chat</ChatContainerHeader>
    <StyledStayDownContainer>
      <ChatList
        room={roomAddress}
        renderGroup={({ chats, peer }) => (
          <ChatMessageGroup key={chats[0].id} chats={chats} peer={peer} />
        )}
      />
    </StyledStayDownContainer>
    <InputContainer className={disabled ? 'chat-disabled' : ''}>
      <ChatInput
        autoFocus
        disabled={disabled}
        room={roomAddress}
        placeholder={disabled ? 'Waiting to join room...' : 'Send a message...'}
        render={chatProps => (
          <>
            <ChatInputTextArea {...chatProps} />
            {disabled 
              ? <Button onClick={chatProps.sendMessage} style={{ float: 'right' }}>
                  <SendIcon />
                  <span>Send</span>
                </Button> 
              : <SendButton onClick={chatProps.sendMessage} style={{ float: 'right' }}>
                  <SendIcon />
                  <span>Send</span>
                </SendButton>
            }
            {/* <SendButton onClick={chatProps.sendMessage} style={{ float: 'right' }}>
              <SendIcon />
              <span>Send</span>
            </SendButton> */}
          </>
        )}
      />
    </InputContainer>
    <ComposersContainer>
      <ChatComposers room={roomAddress} />
    </ComposersContainer>
    <Header onClick={toggleChat}>
      <KeyboardArrowDownIcon />
      <ChatIcon />
      <span>Close</span>
    </Header>
  </Container>
);

export default ChatContainer;
