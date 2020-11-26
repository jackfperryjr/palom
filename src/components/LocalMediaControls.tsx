import { RequestUserMedia } from '@andyet/simplewebrtc';
import MicIcon from 'material-icons-svg/components/baseline/Mic';
import MicOffIcon from 'material-icons-svg/components/baseline/MicOff';
import VideocamIcon from 'material-icons-svg/components/baseline/Videocam';
import VideocamOffIcon from 'material-icons-svg/components/baseline/VideocamOff';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Button } from '../styles/button';
import mq from '../styles/media-queries';
import ScreenshareControls from './ScreenshareControls';
import { colorToString } from '../utils/colorify';

interface MutePauseButtonProps {
  isFlashing?: boolean;
  isOff: boolean;
}

const pulseKeyFrames = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .25;
  }
  100% {
    opacity: 1;
  }
`;

const MuteButton = styled(Button)<MutePauseButtonProps>`
  background-color: ${props => (props.isOff ? '#e60045' : '')};
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  :active {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  &:not(:hover) svg {
    fill: ${props => (props.isOff ? 'white' : '')};
  }
  &:hover svg {
    fill: '';
  }
  ${props =>
    props.isFlashing
      ? css`
          animation: ${pulseKeyFrames} 0.5s ease-in-out infinite;
        `
      : ''}
  }
  ${mq.MOBILE} {
    width: 50%;
  }
`;

const PauseButton = styled(Button)<MutePauseButtonProps>`
  background-color: ${props => (props.isOff ? '#e60045' : '')};
  '& svg': {
    fill: ${props => (props.isOff ? 'white' : '')};
  }
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  :active {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  ${mq.MOBILE} {
    width: 50%;
  }
`;

const Container = styled.div({
  display: 'flex',
  marginBottom: '10px',
  justifyContent: 'space-between'
});

interface LocalMediaControlsProps {
  hasAudio: boolean;
  isMuted: boolean;
  unmute: () => void;
  mute: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  isSpeakingWhileMuted: boolean;
  resumeVideo: () => void;
  pauseVideo: () => void;
}

// LocalMediaControls displays buttons to toggle the mute/pause state of the
// user's audio/video.
const LocalMediaControls: React.SFC<LocalMediaControlsProps> = ({
  hasAudio,
  isMuted,
  unmute,
  mute,
  isPaused,
  isSpeakingWhileMuted,
  resumeVideo,
  pauseVideo
}) => (
  <Container>
    <RequestUserMedia
      audio={{
        deviceId: {
          ideal: localStorage.preferredAudioDeviceId
        }
      }}
      share={true}
      render={(getMedia, captureState) => (
        <MuteButton
          isOff={isMuted}
          isFlashing={isSpeakingWhileMuted || captureState.requestingMicrophoneCapture}
          onClick={() => {
            if (captureState.requestingCapture) {
              return;
            } else if (!hasAudio) {
              getMedia();
            } else if (isMuted) {
              unmute();
            } else {
              mute();
            }
          }}
        >
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </MuteButton>
      )}
    />
    <PauseButton isOff={isPaused} onClick={() => (isPaused ? resumeVideo() : pauseVideo())}>
      {isPaused ? <VideocamOffIcon /> : <VideocamIcon />}
    </PauseButton>
    <ScreenshareControls />
  </Container>
);

export default LocalMediaControls;
