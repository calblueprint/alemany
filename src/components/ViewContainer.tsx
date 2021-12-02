import * as React from 'react';

import { StyleSheet, View } from 'react-native';

type ViewProps = {
  children?: React.ReactNode;
  topPadding?: boolean;
};

const styles = (props: ViewProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: props.topPadding ? 48 : 0,
    },
  });

export default function ViewContainer(props: ViewProps) {
  const classes = styles(props);
  const { children } = props;
  return <View style={classes.container}>{children}</View>;
}

ViewContainer.defaultProps = {
  children: null,
  topPadding: false,
};
