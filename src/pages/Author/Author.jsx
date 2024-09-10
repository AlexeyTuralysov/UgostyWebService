
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'

import '../../app/styles/pages/Author/Author.scss'
import '../../app/styles/substrate/substrate.scss'
import '../../app/styles/shared/buttons/button.scss'
import AuthorSkeleton from './AuthorSkeleton';


import StatTreats from '../../shared/stats/StatTreats';


import Owner from '../Editing/ProfileEdit/Owner';



import axios from 'axios'
import getNameFromJwt from '../../services/auth/authService';

import { backEnd } from '../settings'
import DonationContainer from './service/DonationContainer';

import { useNavigate } from 'react-router-dom';

export default function Author() {
  const { author } = useParams();
  const navigate = useNavigate();  // Хук для навигации

  const [data, setData] = useState([]);
  const [databuns, setDataBuns] = useState([])

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    const userName = getNameFromJwt(jwt);

    setIsOwner(userName === author);
    axios
      .get(backEnd + `/api/user/${author}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error);
      });
  }, [author]);


  useEffect(() => {
    axios
      .get(backEnd, `/api/buns/`)
      .then((response) => {
        setDataBuns(response.databuns)
        console.log(response)

      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  if (loading) return <div><AuthorSkeleton /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        {isOwner && (
          <>
            <Owner nickname={data.nickname} />


            <div className=''>


              <button
                className="edit-button"
                onClick={() => navigate(`/${author}/edit`)}  // Переход на страницу редактирования
              >
                Edit Profile
              </button>


              <button
                className="edit-button"
                onClick={() => navigate(`/${author}/donations`)}  // Переход на страницу редактирования
              >
                Выплаты
              </button>


            </div>

          </>
        )}

        <div className='user-block'>
          <div className='user-avatar'>
            <img src={data.image} alt={data.nickname} />
          </div>
          <div className='user-name'>
            <span>{data.nickname}</span>
          </div>

          <div className='user-stats'>
            {data.buns && data.buns.map((bunItem, index) => (
              <StatTreats
                key={index}
                count={bunItem.quantity}
                clases="treats treats-orange"
                image={bunItem.bun.img_buns}
              />
            ))}
          </div>
        </div>

        <DonationContainer nickname={data.nickname} />
      </div>
    </>
  );
}