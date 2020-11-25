import { RequestDisplayMedia } from '@andyet/simplewebrtc';
import ShareScreenIcon from 'material-icons-svg/components/baseline/ScreenShare';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/button';
import mq from '../styles/media-queries';
import { deviceSupportsVolumeMonitoring } from '../utils/isMobile';
import { colorToString } from '../utils/colorify';

const ScreenShareButton = styled(Button)`
  display: block;
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  :active {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
`;

const EmptySpacer = styled.span({
  width: '120px'
});

// ScreenshareControls displays a button that activates the screenshare flow.
// It also provides a link to install the screenshare extension if it is
// required by the user's browser.
const ScreenshareControls: React.SFC = () => (
  <RequestDisplayMedia
    audio
    volumeMonitoring={deviceSupportsVolumeMonitoring()}
    render={(getDisplayMedia, sharing) => {
      if (!sharing.available) {
        return <EmptySpacer />;
      }

      return (
        <ScreenShareButton title="Screen Share" onClick={getDisplayMedia}>
          <ShareScreenIcon fill="#505658" />
        </ScreenShareButton>
      );
    }}
  />
);

export default ScreenshareControls;
