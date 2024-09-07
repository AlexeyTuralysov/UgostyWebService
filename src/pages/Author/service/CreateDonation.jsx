import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { paymentUrl } from '../../settings';
import Inputusertag from '../../../shared/inputs/Inputusertag';
import TextAreaProps from '../../../shared/inputs/TextAreaProps';

const CreateDonation = ({ nickname, email, gingerbread, cookie, cappuccino, onPaymentSuccess, onPaymentError }) => {
    const [nicknameState, setNicknameState] = useState(nickname);
    const [customText, setCustomText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const createDonation = {
            "nickname": nicknameState,
            "email_donator": email,
            "gingerbread": gingerbread,
            "cookie": cookie,
            "cappuccino": cappuccino,
            "quantity": 1
        };

        axios.post(paymentUrl + `/donate`, createDonation)
            .then((res) => {
                console.log(res.data);
                window.location.assign(res.data.confirmation_url);

                console.log(createDonation);

                if (onPaymentSuccess) {
                    onPaymentSuccess(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
                if (onPaymentError) {
                    onPaymentError(error);
                }
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <Inputusertag custom_text="Имя или ваш @тег соцсети" value={nicknameState} onChange={(e) => setNicknameState(e.target.value)} />
            <TextAreaProps custom_text='Похлебай чаю...' value={customText} onChange={(e) => setCustomText(e.target.value)} />
            <button className='button button--pay' type="submit">Угостить</button>
        </form>
    );
};

CreateDonation.propTypes = {
    nickname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,

    gingerbread: PropTypes.number.isRequired,
    cookie: PropTypes.number.isRequired,
    cappuccino: PropTypes.number.isRequired,

    quantity: PropTypes.number,
    onPaymentSuccess: PropTypes.func,
    onPaymentError: PropTypes.func,
};

export default CreateDonation;
