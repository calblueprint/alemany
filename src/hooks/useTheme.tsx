/**
 * Learn more about themes:
 * https://callstack.github.io/react-native-paper/theming.html
 */
import { configureFonts, DefaultTheme } from 'react-native-paper';

const fonts = {
  regular: {
    fontFamily: 'Inter_400Regular',
  },
  medium: {
    fontFamily: 'Inter_500Medium',
  },
  semibold: {
    fontFamily: 'Inter_600SemiBold',
  },
  bold: {
    fontFamily: 'Inter_700Bold',
  },
  extrabold: {
    fontFamily: 'Inter_800ExtraBold',
  },
  light: {
    fontFamily: 'Inter_400Regular',
  },
  thin: {
    fontFamily: 'Inter_400Regular',
  },
};

const fontConfig = {
  web: fonts,
  ios: fonts,
  android: fonts,
};

const colors = {
  black: '#000000',
  bluegrey: '#373940',
  bluegrey200: '#ADB0B9',
  bluegrey300: '#8E92A0',
  bluegrey500: '#3B3F51',
  bluegrey600: '#373940',
  grey50: '#FBFBFB',
  grey100: '#EDEDED',
  grey200: '#DCDCDC',
  grey300: '#C9C9C9',
  grey400: '#7D7D7D',
  grey700: '#353535',
  red: '#D73333',
  spinach: '#52BD41',
  white: '#FFFFFF',
};

export default function useTheme() {
  return {
    ...DefaultTheme,
    colors: colors,
    fonts: configureFonts(fontConfig),
  };
}
