import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../settings";

export default function PayDonation() {
    const [data, setData] = useState([]); // Инициализируем как пустой массив

    const jwtToken = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        if (jwtToken) {
            axios
                .get(baseUrl + "/api/user/payments/", config)
                .then((res) => {
                    // Убедимся, что данные это массив
                    if (Array.isArray(res.data)) {
                        setData(res.data); // Если это массив, устанавливаем его в состояние
                    } else {
                        console.error("Ожидался массив, но получены другие данные.", res.data);
                    }
                })
                .catch((e) => {
                    console.error("Ошибка при получении данных:", e);
                });
        } else {
            console.log("JWT токен не найден");
        }
    }, [jwtToken]);

    return (
        <ul>
            {data.length > 0 ? (
                data.map((payment) => (
                    <li key={payment.id}>
                        <p>Status: {payment.status}</p>
                    </li>
                ))
            ) : (
                <li>No payments found</li>
            )}
        </ul>
    );
}
