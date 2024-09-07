import { useState } from 'react';

import CreateDonation from './CreateDonation';
import PropTypes from 'prop-types';
import { Greeting } from '../../../entities/thecase/getNameInDative';

import BlockSelector from './BlockSelection'; // Импортируем компонент выбора блока
import QuantityInput from './QuantityInput'; // Импортируем компонент ввода количества

const DonationContainer = (props) => {

    const [selectedItem, setSelectedItem] = useState('cappuccino'); // Состояние для выбранного блока
    const [value, setValue] = useState(1); // Состояние для количества

    // Функция обработки выбора блока
    const handleBlockSelect = (item) => {
        setSelectedItem(item); // Устанавливаем выбранный блок
        setValue(''); // Сбрасываем количество при выборе нового блока
    };

    // Функция обработки изменения значения в input
    const handleQuantityChange = (newValue) => {
        setValue(newValue);
    };

    const getGingerbreadValue = selectedItem === 'gingerbread' ? parseInt(value) || 0 : 0;
    const getCookieValue = selectedItem === 'cookie' ? parseInt(value) || 0 : 0;
    const getCappuccinoValue = selectedItem === 'cappuccino' ? parseInt(value) || 0 : 0;


    return (
        <div className='substrate block-donation'>

            <div className='substrate block-items-donation'>
                <BlockSelector selectedItem={selectedItem} onSelect={handleBlockSelect} />

                <QuantityInput
                    selectedItem={selectedItem}
                    value={value}
                    onChange={handleQuantityChange}
                />

            </div>


            <Greeting name={props.nickname} />


            <div className='forms-donate'>
                <CreateDonation
                    nickname={props.nickname}
                    email={"alexey@gmail.com"}
                    gingerbread={getGingerbreadValue}
                    cookie={getCookieValue}
                    cappuccino={getCappuccinoValue}
                    onPaymentSuccess={() => alert('Платеж прошел успешно!')}
                    onPaymentError={() => alert('Произошла ошибка при оплате!')}
                />
            </div>


        </div>
    );
};

DonationContainer.propTypes = {
    nickname: PropTypes.string.isRequired,
};

export default DonationContainer;
