import PropTypes from 'prop-types';

function checkPlanted(props, propName, componentName) {
  if (props[propName]) {
    if (props[propName].toDate() === 'Invalid Date') {
      return new Error(`${propName} in ${componentName} is not a date`);
    }
  }
  return null;
}
const Comment = PropTypes.arrayOf(PropTypes.object);
const Tree = PropTypes.shape({
  address: PropTypes.string,
  name: PropTypes.string,
  uuid: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  planted: checkPlanted,
  comments: Comment,
  region: PropTypes.string,
});

export default Tree;
