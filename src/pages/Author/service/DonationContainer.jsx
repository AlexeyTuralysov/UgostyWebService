import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateDonation from './CreateDonation';
import { Greeting } from '../../../entities/thecase/getNameInDative';
import BlockSelector from './BlockSelection';
import QuantityInput from './QuantityInput'; 

const DonationContainer = (props) => {
    const [selectedItem, setSelectedItem] = useState('cappuccino'); // выбранная плюшка 
    const [selectedPrice, setSelectedPrice] = useState(0); // цена выбранного элемента
    const [quantity, setQuantity] = useState(1); // кол выбранного элемента
    const [totalPrice, setTotalPrice] = useState(0); // Общая сумма
    const [items, setItems] = useState([]); // массив элементов для пожертвования

    // функция выбора плюшек
    const handleBlockSelect = (item, price) => {
        setSelectedItem(item); 
        setSelectedPrice(price); 
        setQuantity(1); 
    };

    // функция обработки изменения количества
    const handleQuantityChange = (newValue) => {
        setQuantity(newValue);
    };

    // Подсчет общей суммы и обновление массива 'items'
    useEffect(() => {
        setTotalPrice(selectedPrice * quantity); // общая сумма = цена плюшки * количество

        // обновляем массив 'items' для передачи в `CreateDonation`
        setItems([
            {
                bun_name: selectedItem, // Название (плюшки)
                quantity: quantity // Количество выбранной плюшки
            }
        ]);
    }, [selectedItem, selectedPrice, quantity]);

    return (
        <div className='substrate block-donation'>
            <div className='substrate block-items-donation'>
                <BlockSelector selectedItem={selectedItem} onSelect={handleBlockSelect} />
                <QuantityInput
                    selectedItem={selectedItem}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>

            <Greeting name={props.nickname} />
            <div>
                <h3>Общая сумма: {totalPrice} ₽</h3>
            </div>

            <div className='forms-donate'>
                <CreateDonation
                    nickname={props.nickname}
                    email={"alexey@gmail.com"}
                    items={items} 
                    onPaymentSuccess={() => alert('платеж прошел')}
                    onPaymentError={() => alert('ошибка при оплате!')}
                />
            </div>
        </div>
    );
};

DonationContainer.propTypes = {
    nickname: PropTypes.string.isRequired,
};

export default DonationContainer;
