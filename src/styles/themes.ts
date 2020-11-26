import { Color, colorFromHex, darken, lighten } from '../utils/colorify';
import colors from './colors';

export interface BaseTheme {
  background: Color;
  foreground: Color;
  border: Color;
  primaryBackground: Color;
  primaryForeground: Color;
  secondaryBackground: Color;
  secondaryForeground: Color;
  attentionBackground: Color;
  attentionForeground: Color;
  actionBackground: Color;
  actionForeground: Color;
}

export interface Theme extends BaseTheme {
  buttonPrimaryBackground: Color;
  buttonPrimaryBackgroundHover: Color;
  buttonPrimaryBackgroundActive: Color;
  buttonPrimaryText: Color;

  buttonSecondaryBackground: Color;
  buttonSecondaryBackgroundHover: Color;
  buttonSecondaryBackgroundActive: Color;
  buttonSecondaryText: Color;

  buttonAttentionBackground: Color;
  buttonAttentionBackgroundHover: Color;
  buttonAttentionBackgroundActive: Color;
  buttonAttentionText: Color;

  buttonActionBackground: Color;
  buttonActionBackgroundHover: Color;
  buttonActionBackgroundActive: Color;
  buttonActionText: Color;

  alertInfoBackground: Color;
  alertInfoForeground: Color;

  alertErrorBackground: Color;
  alertErrorForeground: Color;
}

const lightBase: BaseTheme = {
  background: colors.ghostWhite,
  foreground: colors.grayDark,
  border: colors.gray,
  primaryBackground: colors.lightSeaGreen,
  primaryForeground: colors.ghostWhite,
  secondaryBackground: colors.atomicTangerine,
  secondaryForeground: colors.bittersweet,
  attentionBackground: colors.fireOpal,
  attentionForeground: colors.ghostWhite,
  actionBackground: colors.coral,
  actionForeground: colors.grayLight
};

const darkBase: BaseTheme = {
  ...lightBase,
  background: colorFromHex('#121212'),
  foreground: colorFromHex('#fff'),
  border: lighten(colorFromHex('#121212'), 0.25),
  secondaryBackground: colorFromHex('#2a2a2a'),
  secondaryForeground: colorFromHex('#fff')
};

function kebabToCamel(s: string): string {
  return s.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function mergeOverrides(base: BaseTheme): BaseTheme {
  const baseTheme: BaseTheme = { ...base };
  const properties = Array.from(
    document.head.querySelectorAll('meta[name*=simplewebrtc-theme]')
  ).reduce((a, b) => {
    const name = b.getAttribute('name');
    const content = b.getAttribute('content');
    if (name !== null && content !== null) {
      a[kebabToCamel(name.replace('simplewebrtc-theme-', ''))] = content;
    }
    return a;
  }, {} as { [key: string]: string });

  Object.keys(properties).forEach(k => {
    if (baseTheme.hasOwnProperty(k)) {
      baseTheme[k as keyof BaseTheme] = colorFromHex(properties[k]);
    }
  });

  return baseTheme;
}

function baseToFull(base: BaseTheme): Theme {
  return {
    ...base,
    buttonPrimaryBackground: base.attentionBackground,
    buttonPrimaryBackgroundHover: base.attentionBackground,
    buttonPrimaryBackgroundActive: base.attentionBackground,
    buttonPrimaryText: base.primaryForeground,

    buttonSecondaryBackground: base.actionForeground,
    buttonSecondaryBackgroundHover: base.actionForeground,
    buttonSecondaryBackgroundActive: base.actionForeground,
    buttonSecondaryText: base.primaryForeground,

    buttonAttentionBackground: base.attentionBackground,
    buttonAttentionBackgroundHover: lighten(base.attentionBackground, 0.05),
    buttonAttentionBackgroundActive: darken(base.attentionBackground, 0.05),
    buttonAttentionText: base.attentionForeground,

    buttonActionBackground: base.actionBackground,
    buttonActionBackgroundHover: lighten(base.actionBackground, 0.05),
    buttonActionBackgroundActive: darken(base.actionBackground, 0.05),
    buttonActionText: base.actionForeground,

    alertInfoBackground: base.background,
    alertInfoForeground: base.attentionBackground,

    alertErrorBackground: base.background,
    alertErrorForeground: base.attentionBackground
  };
}

const themes: { [index: string]: Theme } = {
  light: baseToFull(mergeOverrides(lightBase)),
  dark: baseToFull(mergeOverrides(darkBase))
};

export default themes;
