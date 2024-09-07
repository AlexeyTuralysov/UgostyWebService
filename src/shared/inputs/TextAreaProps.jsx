import PropTypes from 'prop-types';
import './../../app/styles/widgets/inputs/TextArea.scss'

const TextAreaProps=(props) =>  {
  return (
    <textarea name="" placeholder={props.custom_text} id=""></textarea>
  )
}

TextAreaProps.propTypes = {
    custom_text: PropTypes.string.isRequired
};

export default TextAreaProps;