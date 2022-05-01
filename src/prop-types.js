import { arrayOf, number, shape, string } from 'prop-types';

function checkPlanted(props, propName, componentName) {
  if (props[propName]) {
    if (props[propName].toDate() === 'Invalid Date') {
      return new Error(`${propName} in ${componentName} is not a date`);
    }
  }
  return null;
}

export const Comment = shape({
  uuid: string,
  text: string,
});
export const Tree = shape({
  id: string,
  name: string,
  uuid: string,
  location: shape({
    latitude: number,
    longitude: number,
  }),
  planted: checkPlanted,
  comments: arrayOf(Comment),
  region: string,
});
