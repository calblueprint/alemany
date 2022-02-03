import * as React from 'react';

import { ViewPropTypes } from 'react-native';
import { Text } from 'react-native-paper';

export default function MonoText({ style, ...props }) {
  return (
    <Text
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={[style, { backgroundColor: '#fafafa', fontFamily: 'space-mono' }]}
    />
  );
}

MonoText.propTypes = {
  style: ViewPropTypes.style,
};
