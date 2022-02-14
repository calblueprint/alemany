import React from 'react';

import { cleanup, render } from '@testing-library/react-native';

import SettingsScreen from '../screens/SettingsScreen';

afterEach(cleanup);

describe('Settings Screen', () => {
  it('should have an attribution', () => {
    const pattern = /built by/i;

    const { toJSON, getByText } = render(
      <SettingsScreen
        navigation={{
          navigate: () => {},
        }}
      />,
    );

    const elem = getByText(pattern);

    expect(elem).toHaveTextContent(pattern);
    expect(toJSON()).toMatchSnapshot();
  });
});
