import PropTypes from 'prop-types';
import './../../app/styles/widgets/inputs/input.scss'


const Inputusertag =(props) => {
  return  <input className='input' type="text" name="user-tag" placeholder={props.custom_text}  />;
  
}

Inputusertag.propTypes = {
    custom_text: PropTypes.string.isRequired
};

export default Inputusertag;