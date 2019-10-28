import React, {useState, useEffect} from 'react';
import "./ShareButton.css";
import Icon24Share from '@vkontakte/icons/dist/24/share';

const ShareButton = () => (
    <button className="share-project-button"><Icon24Share/></button>
);

export default ShareButton;