
import PropTypes from 'prop-types';


import { declineFirstname, detectGender } from 'lvovich';
import { inclineLastname } from 'lvovich';

export function Greeting({ name }) {

  const detectLanguage = (name) => {
    const cyrillicPattern = /[а-яА-ЯЁё]/; // Проверка на наличие кириллических символов
    return cyrillicPattern.test(name) ? 'ru' : 'en';
  };

  const language = detectLanguage(name);
  let result;

  if (language === 'ru') {
      result = inclineLastname(name, 'dative'); // Склоняем русское имя
  } else if (language === 'en') {
      result = name.endsWith('s') ? `${name}'` : `${name}'s`; // Притяжательная форма для английского имени
  } else {
      result = name; // Если язык не определен, возвращаем имя как есть
  }

  return (
    <h3 >Задонатить {result}</h3>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
