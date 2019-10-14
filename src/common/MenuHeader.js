import React from 'react';

import './MenuHeader.css';


const MenuHeader = ({headerTitle}) => (

    <header>
        <p className="title">{headerTitle}</p>
    </header>

);

export default MenuHeader;