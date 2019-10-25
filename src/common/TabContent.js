import React from 'react';
import Accordion from "./Accordion";

const TabContent = () => {
    return(
        <div>
            <Accordion title="Управление чатом">
                <p className="dropdown-item">Информация о чате</p>
                <p className="dropdown-item">Показать вложения</p>
                <p className="dropdown-item">Отключить уведомления</p>
            </Accordion>
            <div className="messages">
                <div className="message-item">
                    <p className="message-author">Валерий Петрович</p>
                    <p className="message-text">Превеееееед, медвед! </p>
                </div>
            </div>
        </div>
    )
};

export default TabContent;