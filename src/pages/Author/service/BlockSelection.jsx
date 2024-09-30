
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { backEnd } from '../../settings'

const BlockSelector = ({ selectedItem, onSelect }) => {

    const [bunsState, setBunsState] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(backEnd + '/api/buns/')
            .then(BunsGet => {
                setBunsState(BunsGet.data);
            })
            .catch(error => {
                setError('не удалось загрузить данные',error);
            });
    }, []);

    
    


    return (
        <>
            {bunsState.map(bun => (
                <div
                    key={bun.id}
                    className={`circle-image ${selectedItem === bun.name ? 'selected' : ''}`}
                    onClick={() => onSelect(bun.name, bun.price)} 
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



