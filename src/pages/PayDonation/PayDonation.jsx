import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../settings";

export default function PayDonation() {
    const [data, setData] = useState([]);

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
                    console.log(res.data);
                    setData(res.data);
                })
                .catch((e) => {
                    console.error("ошибка при получении данных:", e);
                });
        } else {
            console.log("JWT токен не найден");
        }
    }, [jwtToken]);

    return (
        <ul>
            {data.length > 0 ? (
                data.map((donate) => (


                    <div key={donate.id}>
                        <h1>{donate.social_media}</h1>

                        {donate.donation_message ? (
                            <p>{donate.donation_message}</p>
                        ) : (
                            <p>пустое поле</p>
                        )}
                      

                    </div>
                ))
            ) : (
                <li>данных нет</li>
            )}
        </ul>
    );
}
