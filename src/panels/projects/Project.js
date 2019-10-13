import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import eventPhoto from '../../img/haka.png';
import './Project.css'
const Project = ({date, label, go}) => (
    <div>
        <button onClick={go} data-to="project">Открыть</button>

        <div className="event-section event-section-1">
            <div className="event">
                <div className="photo-overlay">
                    <img className="event-photo-sizer" src={eventPhoto} />
                </div>
                <div className="event-info">
                    <p className="event-date">{date}</p>
                    <p className="event-title">{label}</p>
                    <div className="btn-org">
                        <div className="btn-name">Открыть</div>
                    </div>
                </div>
                <img className="event-photo" src={eventPhoto} alt="event photo"/>
            </div>
        </div>
    </div>
);

export default Project;