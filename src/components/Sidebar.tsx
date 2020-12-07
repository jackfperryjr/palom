import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import mq from '../styles/media-queries';
import { colorToString } from '../utils/colorify';
import RoomControls from './RoomControls';
import Roster from './Roster';
import SidebarLinks from './SidebarLinks';
import SidebarUserControls from './SidebarUserControls';
import { LocalMediaList, Media, MediaControls, UserControls, Video } from '@andyet/simplewebrtc';
import LocalMediaControls from './LocalMediaControls';
import ChatContainer from '../components/ChatContainer';
import ChatToggle from '../components/ChatToggle';

const Container = styled.div`
  position: fixed;
  padding: 10px;
  background-color: transparent;
  text-align: center;
  ${mq.MOBILE} {
    z-index: 200;
    bottom: 70px;
    width: 100%;
    margin: 0 auto;
  }
  ${mq.SMALL_DESKTOP} {
    bottom: 40px;
    width: 100%;
    z-index: 200;
    margin: 0 auto;
  }
  & button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: inline;
  }
`;

interface Props {
  roomAddress: string;
  activeSpeakerView: boolean;
  toggleActiveSpeakerView: () => void;
  pttMode: boolean;
  togglePttMode: (e: React.SyntheticEvent) => void;
  setPassword: (s: string) => void;
  passwordRequired?: boolean;
  roomId: string;
  currentPassword?: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface State {
  showPasswordModal: boolean;
  chatOpen: boolean;
}

// Sidebar contains all the UI elements that are rendered in the Sidebar
// inside a Room.
// TODO: Use Router to navigate to feedback page.
export default class Sidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      showPasswordModal: false,
      chatOpen: false 
    };
  }

  public render() {
    const {
      roomAddress,
      activeSpeakerView,
      toggleActiveSpeakerView,
      passwordRequired,
      pttMode,
      togglePttMode,
      setPassword,
      roomId,
      currentPassword,
      sidebarOpen,
      toggleSidebar
    } = this.props;

    return (
      <Container>
        <RoomControls
          shouldShowPasswordModal={this.state.showPasswordModal}
          passwordRequired={passwordRequired}
          showPasswordModal={this.showPasswordModal}
          hidePasswordModal={this.hidePasswordModal}
          setPassword={setPassword}
          roomId={roomId}
          currentPassword={currentPassword}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <UserControls
          render={({
            hasAudio,
            isMuted,
            mute,
            unmute,
            isPaused,
            isSpeaking,
            isSpeakingWhileMuted,
            pauseVideo,
            resumeVideo,
            user,
            setDisplayName
          }) => (
              <LocalMediaControls
                hasAudio={hasAudio}
                isMuted={isMuted}
                unmute={unmute}
                mute={mute}
                isPaused={isPaused}
                resumeVideo={() => resumeVideo({ screenCapture: false })}
                pauseVideo={() => pauseVideo({ screenCapture: false })}
                isSpeaking={isSpeaking}
                isSpeakingWhileMuted={isSpeakingWhileMuted}
              />
          )}
        />
        {this.state.chatOpen ? (
          <>
          <ChatToggle roomAddress={roomAddress!} onClick={this.toggleChat} />
          <ChatContainer
            // disabled={!room.joined}
            roomAddress={roomAddress!}
            toggleChat={this.toggleChat}
          />
          </>
        ) : (
          <ChatToggle roomAddress={roomAddress!} onClick={this.toggleChat} />
        )}
        <SidebarUserControls
          activeSpeakerView={activeSpeakerView}
          toggleActiveSpeakerView={toggleActiveSpeakerView}
          pttMode={pttMode}
          togglePttMode={togglePttMode}
        />
        {/* <Roster roomAddress={roomAddress} /> */}
        <SidebarLinks roomId={roomId} />
      </Container>
    );
  }

  private showPasswordModal = () => {
    this.setState({ showPasswordModal: true });
  };

  private hidePasswordModal = () => {
    this.setState({ showPasswordModal: false });
  };

  private toggleChat = () => {
    this.setState({ chatOpen: !this.state.chatOpen });
  };
}
