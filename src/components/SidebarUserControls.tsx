import { LocalMediaList, Media, MediaControls, UserControls, Video } from '@andyet/simplewebrtc';
import React from 'react';
import styled from 'styled-components';
import DisplayNameInput from './DisplayNameInput';
import Tooltip from './Tooltip';
import mq from '../styles/media-queries';

const LocalVideo = styled.div({
  position: 'fixed',
  [mq.SMALL_DESKTOP]: {
    bottom: '40px',
    '& video': {
      display: 'block',
      objectFit: 'cover',
      width: '250px',
      height: 'auto',
      borderRadius: '15px'
    }
  },
  [mq.MOBILE]: {
    bottom: '160px',
    '& video': {
      display: 'block',
      objectFit: 'cover',
      width: '200px',
      height: '150px',
      borderRadius: '15px'
    }
  },
  '& input': {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    boxSizing: 'border-box',
    border: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    color: '#ffffff',
    fontSize: '14px',
    padding: '8px'
  }
});

const RoomModeToggles = styled.div({
  '& input': {
    marginRight: '5px'
  },
  '& label': {
    fontWeight: 'bold',
    fontSize: '12px'
  }
});

const EmptyVideo = styled.div({
  width: '100%',
  height: '133px',
  backgroundColor: '#000000',
});

const ToggleContainer = styled.label({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px'
});

interface Props {
  activeSpeakerView: boolean;
  toggleActiveSpeakerView: () => void;
  pttMode: boolean;
  togglePttMode: (e: React.SyntheticEvent<Element>) => void;
}

interface LocalScreenProps {
  screenshareMedia: Media;
}

const LocalScreenContainer = styled.div({
  position: 'relative'
});

const LocalScreenOverlay = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  opacity: 0,
  transition: 'opacity 200ms linear',
  color: 'white',
  zIndex: 100,
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8
  }
});

const LocalScreen: React.SFC<LocalScreenProps> = ({ screenshareMedia }) => (
  <MediaControls
    media={screenshareMedia}
    autoRemove={true}
    render={({ media, stopSharing }) => (
      <LocalScreenContainer>
        <LocalScreenOverlay onClick={stopSharing}>
          <span>Stop sharing</span>
        </LocalScreenOverlay>
        {media && <Video media={media!} />}
      </LocalScreenContainer>
    )}
  />
);

const SidebarUserControls: React.SFC<Props> = ({
  activeSpeakerView,
  toggleActiveSpeakerView,
  pttMode,
  togglePttMode
}) => (
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
      <>
        <LocalVideo>
          <DisplayNameInput displayName={user.displayName} setDisplayName={setDisplayName} />
          <LocalMediaList
            shared={true}
            render={({ media }) => {
              const videos = media.filter(m => m.kind === 'video');
              if (videos.length > 0) {
                return (
                  <>
                    {videos.map(m =>
                      m.screenCapture ? (
                        <LocalScreen key={m.id} screenshareMedia={m} />
                      ) : (
                        <Video key={m.id} media={m} />
                      )
                    )}
                  </>
                );
              }

              return <EmptyVideo />;
            }}
          />
        </LocalVideo>
        <RoomModeToggles>
          {/*
              Disabled until SDK changes fixed to handle case where no one is speaking.

              <div>
                <ToggleContainer>
                  <input
                    type="checkbox"
                    checked={activeSpeakerView}
                    onChange={toggleActiveSpeakerView}
                  />
                  Active Speaker View
                  <Tooltip text="Only show the active speaker in the podium" />
                </ToggleContainer>
              </div>
            */}
          <div>
            {/* <ToggleContainer>
              <input type="checkbox" checked={pttMode} onChange={togglePttMode} />
              Walkie Talkie Mode
              <Tooltip text="Use spacebar to toggle your microphone on/off" />
            </ToggleContainer> */}
          </div>
        </RoomModeToggles>
      </>
    )}
  />
);

export default SidebarUserControls;
