import 'styled-components';
import { Color } from './utils/colorify';
import { Theme } from './styles/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
