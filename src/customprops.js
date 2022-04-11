import PropTypes from 'prop-types';

const Comment = PropTypes.arrayOf(PropTypes.string);
const Tree = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  uuid: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  planted: PropTypes.instanceOf(Date),
  comments: Comment,
  region: PropTypes.string,
});

export default Tree;
