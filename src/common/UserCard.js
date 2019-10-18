import React from 'react';
import ava from "../img/ava.jpg";

const UserCard = () => (
    <div className="user-card" >
        <div className="avatar-wrapper">
            <img className="ava" src={ava} alt="user" />
        </div>
        <div className="user-info">
            <p className="name">Андрей Андреев</p>
            <p className="expirience">Опыт: более 15 мероприятий</p>
        </div>
    </div>
);


export default UserCard;