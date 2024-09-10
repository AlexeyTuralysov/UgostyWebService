
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { backEnd } from '../../settings'

const BlockSelector = ({ selectedItem, onSelect }) => {

    const [buns, setBuns] = useState([]);
    const [error, setError] = useState(null);

    // Функция для запроса данных с сервера
    const fetchBuns = async () => {
        try {
            const response = await axios.get(backEnd + '/api/buns/');
            setBuns(response.data); // Устанавливаем данные
        } catch (error) {
            setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
        }
    };

    useEffect(() => {
        fetchBuns();
    }, []);


    return (
        <>
            {buns.map(bun => (
                <div
                    key={bun.id}
                    className={`circle-image ${selectedItem === bun.name ? 'selected' : ''}`}
                    onClick={() => onSelect(bun.name, bun.price)} // Передаем имя и цену выбранной булочки
                >
                    <img src={bun.img_buns} alt={bun.name} />
                  

                </div>
            ))}





        </>
    );
};

BlockSelector.propTypes = {
    nickname: PropTypes.string.isRequired,

};

export default BlockSelector;



