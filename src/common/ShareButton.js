import React from 'react';
import connect from '@vkontakte/vk-connect';
import "./ShareButton.css";

const ShareButton = () => {
    const share = () => {
        connect.send("VKWebAppShowWallPostBox", {
            message: "Я участвую в волонтёрском проекте в приложении Дай пять",
            attachments:"https://vk.com/app7150209"});
}
    return (
        <button onClick={share} className="share-project-button">Поделиться</button>
    );
}
export default ShareButton;