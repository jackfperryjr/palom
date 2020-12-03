import LinkIcon from 'material-icons-svg/components/baseline/Link';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../styles/button';
import { colorToString } from '../utils/colorify';

const CopyInviteButton = styled(Button)`
  grid-area: invite;
  background-color: ${({ theme }) => colorToString(theme.primaryBackground)};
  color: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  :hover {
    background-color: ${({ theme }) => colorToString(theme.secondaryBackground)};
  }
  svg {
    fill: ${({ theme }) => colorToString(theme.buttonPrimaryText)};
  }
`;

interface State {
  copied: boolean;
}

export default class InviteButton extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { copied: false };
  }

  public render() {
    return (
      <CopyInviteButton onClick={this.onClick}>
        <LinkIcon />
        <span>{this.state.copied ? 'Copied!' : 'Invite'}</span>
      </CopyInviteButton>
    );
  }

  private onClick = async () => {
    try {
      if ('clipboard' in navigator) {
        await (navigator as any).clipboard.writeText(window.location.href);
      } else {
        const el = document.createElement('textarea');
        el.style.fontSize = '12pt';
        // Reset box model
        el.style.border = '0';
        el.style.padding = '0';
        el.style.margin = '0';
        // Move element out of screen horizontally
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        // Move element to the same position vertically
        const yPosition = window.pageYOffset || document.documentElement.scrollTop;
        el.style.top = `${yPosition}px`;
        document.body.appendChild(el);
        el.setAttribute('readonly', '');
        el.value = window.location.href;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      this.setState({ copied: true });
    } catch (err) {
      console.error(err);
    }
  };
}
