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

export default function useTheme() {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
    fonts: configureFonts(fontConfig),
  };
}
