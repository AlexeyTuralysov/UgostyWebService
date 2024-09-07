
import { useState } from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Counts = ({ onSelectItem, onUpdateQuantity, selectedItem }) => {

    const [itemQuantities, setItemQuantities] = useState({
        cappuccino: 0,
        cookie: 0,
        gingerbread: 0
    });


    const handleClick = (type) => {
        // Выбираем новый элемент
        onSelectItem(type);
    };

    const handleQuantityChange = (operation) => {
        if (!selectedItem) return;

        setItemQuantities((prevQuantities) => {
            const newQuantity = operation === 'increase'
                ? prevQuantities[selectedItem] + 1
                : Math.max(prevQuantities[selectedItem] - 1, 0);

            // Обновляем состояние
            onUpdateQuantity(selectedItem, newQuantity);
            return {
                ...prevQuantities,
                [selectedItem]: newQuantity
            };
        });
    };

    return (
        <>
            <div className='block-count'>
                <div
                    className={`circle-image ${selectedItem === 'cappuccino' ? 'selected' : ''}`}
                    onClick={() => handleClick('cappuccino')}>
                    <img src="/src/assets/img/donate/cup2.png" alt="Cup" />
                    
                </div>
                <div className='block-count'>
                    <span>{itemQuantities.cappuccino}</span>
                </div>
            </div>

            <div className='block-count'>
                <div
                    className={`circle-image ${selectedItem === 'cookie' ? 'selected' : ''}`}
                    onClick={() => handleClick('cookie')}>
                    <img src="/src/assets/img/donate/cookie2.png" alt="Pryanic" />
                </div>
                <div>
                    <span>{itemQuantities.cookie}</span>
                </div>
            </div>

            <div className='block-count'>
                <div
                    className={`circle-image ${selectedItem === 'gingerbread' ? 'selected' : ''}`}
                    onClick={() => handleClick('gingerbread')}>
                    <img src="/src/assets/img/donate/pryanic.png" alt="Pryanic" />
                </div>
                <div>
                    <span>{itemQuantities.gingerbread}</span>
                </div>
            </div>

            {/* Кнопки для увеличения/уменьшения количества */}
            <div className='quantity-controls'>
                <button className='button button--round' onClick={() => handleQuantityChange('decrease')}>-</button>
                <button className='button button--round' onClick={() => handleQuantityChange('increase')}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </>
    );
};

Counts.propTypes = {
    nickname: PropTypes.string.isRequired,

};

export default Counts;



