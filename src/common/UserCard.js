import React from 'react';
import ava from "../img/ava.jpg";
import './UserCard.css';

const UserCard = ({userInfo, size}) => {
    if (size === undefined) {
        size="60px"
    }

    return(

        <div className="user-card" >
            <div className="avatar-wrapper" style={{width:size, height:size}}>
                <img className="ava" src={userInfo.photo ? userInfo.photo : ava} alt="user" />
            </div>
            <div className="user-info">
                <p className="name">{userInfo.firstName + ' ' + userInfo.lastName}</p>
                <p className="experience">Опыт: более 15 мероприятий</p>
            </div>
        </div>
    );
}


export default UserCard;