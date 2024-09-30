import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateDonation from './CreateDonation';
import { Greeting } from '../../../entities/thecase/getNameInDative';
import BlockSelector from './BlockSelection';
import QuantityInput from './QuantityInput'; 

const DonationContainer = (props) => {
    const [selectedItem, setSelectedItem] = useState('cappuccino'); // выбранная плюшка 
    const [selectedPrice, setSelectedPrice] = useState(150); // цена выбранного элемента
    const [quantity, setQuantity] = useState(1); // кол выбранного элемента
    const [totalPrice, setTotalPrice] = useState(0); // Общая сумма
    const [items, setItems] = useState([]); // массив элементов для пожертвования

   
    const handleBlockSelect = (item, price) => {
        setSelectedItem(item); 
        setSelectedPrice(price); 
        setQuantity(1); 
    };

 
    const handleQuantityChange = (newValue) => {
        setQuantity(newValue);
    };

   
    useEffect(() => {
        setTotalPrice(selectedPrice * quantity); 

        
        setItems([
            {
                bun_name: selectedItem, 
                quantity: quantity 
            }
        ]);
    }, [selectedItem, selectedPrice, quantity]);

    return (
        <div className='substrate block-donation'>
            <div className='substrate block-items-donation'>
                <div className='block-items-donation child-item'>
                    <BlockSelector selectedItem={selectedItem} onSelect={handleBlockSelect} />
                </div>
                
                <QuantityInput
                    selectedItem={selectedItem}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>

            <Greeting name={props.nickname} />
            

            <div className='forms-donate'>
                <CreateDonation
                    nickname={props.nickname}
                    items={items} 
                    onPaymentSuccess={() => alert('платеж прошел')}
                    onPaymentError={() => alert('ошибка при оплате!')}
                    sumPrice={totalPrice}
                />
            </div>
        </div>
    );
};

DonationContainer.propTypes = {
    nickname: PropTypes.string.isRequired,
};

export default DonationContainer;
