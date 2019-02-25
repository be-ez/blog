import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const RichText = ({ document, options }) => {
  console.log(document)
  return documentToReactComponents(document, options);
};

RichText.propTypes = {
  document: PropTypes.object,
  options: PropTypes.object,
};

export default RichText;
