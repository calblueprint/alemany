import * as React from 'react';

import { Text } from 'react-native-paper';

interface TextProps {
  style?: object;
}

export default function MonoText(props: TextProps) {
  const { style } = props;
  return (
    <Text
      {...props}
      style={[style, { backgroundColor: '#fafafa', fontFamily: 'space-mono' }]}
    />
  );
}

MonoText.defaultProps = {
  style: null,
};
