import React from 'react';

import PropTypes from 'prop-types';
import { Card } from 'react-native-paper';

export default function SearchCard({ name, id, onPress }) {
  return (
    <Card style={{ height: 100 }} onPress={onPress}>
      <Card.Title title={name} subtitle={id} />
    </Card>
  );
}

SearchCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  onPress: PropTypes.func,
};
