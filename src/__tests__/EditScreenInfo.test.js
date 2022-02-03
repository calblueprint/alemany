import React from 'react';

import { cleanup, render } from '@testing-library/react-native';

import EditScreenInfo from '../components/EditScreenInfo';

afterEach(cleanup);

describe('Edit Screen Info', () => {
  it('should show hello world', () => {
    const text = 'Hello World!';

    const { toJSON, getByText } = render(<EditScreenInfo path={text} />);

    const elem = getByText(text);

    expect(elem.props.children).toEqual(text);
    expect(toJSON()).toMatchSnapshot();
  });
});
