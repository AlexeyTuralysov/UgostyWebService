import { useState } from 'react';
import Counts from './Counts';
import CreateDonation from './CreateDonation';
import PropTypes from 'prop-types';
import { Greeting } from '../../../entities/thecase/getNameInDative';


const DonationContainer = (props) => {
    const [selectedItem, setSelectedItem] = useState('cappuccino');
    const [itemQuantities, setItemQuantities] = useState({
        cappuccino: 0,
        gingerbread: 0,
        cookie: 0
    });

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleUpdateQuantity = (item, newQuantity) => {
        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item]: newQuantity
        }));
    };

    return (
        <div className='substrate block-donation'>
            <div className='substrate block-items-donation'>
                <Counts
                    onSelectItem={handleSelectItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    selectedItem={selectedItem}
                />
            </div>

          
            <Greeting name={props.nickname}/>
            

            <div className='forms-donate'>
                <CreateDonation
                    nickname={props.nickname}
                    email="alexey@gmail.com"
                    cookie={itemQuantities.cookie}
                    gingerbread={itemQuantities.gingerbread}
                    cappuccino={itemQuantities.cappuccino}
                    quantity={itemQuantities[selectedItem] || 1}  // Optional fallback
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
