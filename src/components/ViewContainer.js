import * as React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = ({ topPadding }) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: topPadding ? 48 : 0,
    },
  });

export default function ViewContainer({ children = null, topPadding = false }) {
  const classes = styles({ topPadding });
  return <View style={classes.container}>{children}</View>;
}

ViewContainer.propTypes = {
  children: PropTypes.node,
  topPadding: PropTypes.bool,
};
