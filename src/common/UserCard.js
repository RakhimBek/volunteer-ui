import React from 'react';
import ava from "../img/ava.jpg";
import './UserCard.css';

const UserCard = ({userInfo}) => (

    <div className="user-card" >
        <div className="avatar-wrapper">
            <img className="ava" src={ava} alt="user" />
        </div>
        <div className="user-info">
            <p className="name">{userInfo.firstName + ' ' + userInfo.lastName}</p>
            <p className="expirience">Опыт: более 15 мероприятий</p>
        </div>
    </div>
);


export default UserCard;