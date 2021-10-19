import * as React from 'react';

import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    justifyContent: 'center',
    padding: '2%',
    // margin: '5%',
=======
    flex: 1,
    alignItems: 'center',
>>>>>>> origin/main
    backgroundColor: '#fff',
  },
});

type ViewProps = {
  children?: React.ReactNode;
};

export default function ViewContainer(props: ViewProps) {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
}

ViewContainer.defaultProps = {
  children: null,
};
