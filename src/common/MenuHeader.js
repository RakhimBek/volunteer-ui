import React from 'react';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import './MenuHeader.css';


const MenuHeader = ({headerTitle, closeButton}) => (
        <header className="menu-header">
            <p className="title">{headerTitle}</p>
            {closeButton&&
                <button className="header-back-button" onClick={() => window.history.back()}><Icon24Cancel/></button>
            }
        </header>
);

export default MenuHeader;