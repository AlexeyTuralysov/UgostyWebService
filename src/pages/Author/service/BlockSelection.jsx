
import { useState } from 'react';
import PropTypes from 'prop-types';



const BlockSelector = ({ selectedItem, onSelect }) => {



    return (
        <>
            <div
                className={`circle-image ${selectedItem === 'cappuccino' ? 'selected' : ''}`}
                onClick={() => onSelect('cappuccino')}
            >
                <img src="/src/assets/img/donate/cup2.png" alt="Cappuccino" />
            </div>

            <div
                className={`circle-image ${selectedItem === 'gingerbread' ? 'selected' : ''}`}
                onClick={() => onSelect('gingerbread')}
            >
                <img src="/src/assets/img/donate/pryanic.png" alt="Gingerbread" />
            </div>

            <div
                className={`circle-image ${selectedItem === 'cookie' ? 'selected' : ''}`}
                onClick={() => onSelect('cookie')}
            >
                <img src="/src/assets/img/donate/cookie.png" alt="Cookie" />
            </div>

        </>
    );
};

BlockSelector.propTypes = {
    nickname: PropTypes.string.isRequired,

};

export default BlockSelector;



