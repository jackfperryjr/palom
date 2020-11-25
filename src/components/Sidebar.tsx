import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import mq from '../styles/media-queries';
import { colorToString } from '../utils/colorify';
import RoomControls from './RoomControls';
import Roster from './Roster';
import SidebarLinks from './SidebarLinks';
import SidebarUserControls from './SidebarUserControls';

const Container = styled.div`
  position: absolute;
  padding: 10px;
  background-color: transparent;
  ${mq.MOBILE} {
    z-index: 200;
    bottom: 20px;
    width: 185px;
  }
  ${mq.SMALL_DESKTOP} {
    top: 30px;
    width: 220px;
    z-index: 200;
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
}

// Sidebar contains all the UI elements that are rendered in the Sidebar
// inside a Room.
// TODO: Use Router to navigate to feedback page.
export default class Sidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showPasswordModal: false };
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
}
