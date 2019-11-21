import React from 'react';
import ava from "../img/ava.jpg";
import './UserCard.css';
import Utils from "../utils/utils";

const UserCard = ({userInfo, size}) => {
    if (size === undefined) {
        size="60px"
    }

    const imageUrl = Utils.path('attachment/' + userInfo.image.id);
    return(
        <div className="user-card" >
            <div className="avatar-wrapper" style={{width:size, height:size}}>
                <img className="ava" src={imageUrl ? imageUrl : ava} alt="user" />
            </div>
            <div className="user-info">
                <p className="name">{userInfo.firstName + ' ' + userInfo.lastName}</p>
                <p className="experience">Опыт: более 15 мероприятий</p>
            </div>
        </div>
    );
};


export default UserCard;