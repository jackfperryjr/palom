import CallEndIcon from 'material-icons-svg/components/baseline/CallEnd';
import LockIcon from 'material-icons-svg/components/baseline/Lock';
import LockOpenIcon from 'material-icons-svg/components/baseline/LockOpen';

import React, { CSSProperties } from 'react';
import Modal from 'react-modal';
import styled, { css, keyframes } from 'styled-components';
import { Button } from '../styles/button';
import { colorToString } from '../utils/colorify';
import getConfigFromMetaTag from '../utils/metaConfig';
import InviteButton from './InviteButton';
import PasswordEntry from './PasswordEntry';

const LockButton = styled(Button)`
  gridArea: lock;
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
`;

const LeaveButton = styled(Button)`
  background-color: #e60045;
  width: 100%;
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
`;

const LockedLabel = styled.div({
  gridArea: 'pin',
  textAlign: 'center'
});

const Container = styled.div({
  gridTemplateAreas: `
    'pin pin pin pin pin pin pin'
    'mute pause share chat invite lock leave'
  `,
  gridColumnGap: '10px',
  gridRowGap: '10px',
  position: 'fixed',
  bottom: '40px',
  left: '51%'
});

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => colorToString(theme.background)};
  position: relative;
  top: calc(50% - 115px);
  bottom: 40px;
  border: ${({ theme }) => css`1px solid ${colorToString(theme.border)}`};
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 35px 20px 20px;
  max-width: 500px;
  margin: 0px auto;
`;

const modalOverlayStyle: CSSProperties = {
  zIndex: 1000,
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  boxShadow: 'inset 0 0 100px rgba(0,0,0,.7)'
};

interface Props {
  shouldShowPasswordModal: boolean;
  passwordRequired: boolean | undefined;
  showPasswordModal: () => void;
  hidePasswordModal: () => void;
  setPassword: (s: string) => void;
  roomId: string;
  currentPassword?: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const RoomControls: React.SFC<Props> = ({
  shouldShowPasswordModal,
  passwordRequired,
  showPasswordModal,
  hidePasswordModal,
  setPassword,
  roomId,
  currentPassword,
  sidebarOpen,
  toggleSidebar
}) => {
  const leaveUrl = getConfigFromMetaTag('leave-button-url');
  let parsedLeaveUrl;
  if (leaveUrl) {
    parsedLeaveUrl = new URL(leaveUrl);
    parsedLeaveUrl.searchParams.set('room', roomId);
  }

  return (
    <>
      <LockedLabel>
        {currentPassword && <span>Locked: {currentPassword}</span>}
        {!currentPassword && <span>Unlocked!</span>}
      </LockedLabel>
      {/* <HideButton onClick={toggleSidebar}>
        <HideIcon fill="#505658" />
      </HideButton> */}
      <a style={{ gridArea: 'leave' }} href={parsedLeaveUrl ? parsedLeaveUrl.toString() : '/penelo'}>
        <LeaveButton>
          <CallEndIcon fill="#505658" />
        </LeaveButton>
      </a>
      <InviteButton />
      <LockButton
        onClick={
          passwordRequired
            ? () => {
                setPassword('');
              }
            : () => {
                  function keyGen() {
                    var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    var charactersLength = characters.length;
                
                    for (i = 0; i < 8; i++) {
                        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
                    }
                
                    return key;
                }
                // const code = `${Math.floor(Math.random() * 10000)}`;
                const code = keyGen();
                setPassword(code);
              }
        }
      >
        {passwordRequired ? (
          <>
            <LockIcon fill="#505658" />
          </>
        ) : (
          <>
            <LockOpenIcon fill="#505658" />
          </>
        )}
      </LockButton>
      <StyledModal
        isOpen={shouldShowPasswordModal}
        onRequestClose={hidePasswordModal}
        style={{ overlay: modalOverlayStyle }}
      >
        <PasswordEntry
          setting={true}
          setPassword={setPassword}
          passwordIsIncorrect={false}
          onSubmit={hidePasswordModal}
        />
      </StyledModal>
    </>
  );
};

export default RoomControls;
