import React from 'react';


import eventPhoto from '../../img/haka.png';
import './Project.css'
const Project = ({date, label, go}) => (
    <div>
        <div className="event-section event-section-1">
            <div className="event">
                <div className="photo-overlay">
                    <img className="event-photo-sizer" src={eventPhoto} alt=""/>
                </div>
                <div className="event-info">
                    <p className="event-date">{date}</p>
                    <p className="event-title">{label}</p>
                    <div className="btn-org">
                        <div className="btn-name" onClick={go} data-to="project">Открыть</div>
                    </div>
                </div>
                <img className="event-photo" src={eventPhoto} alt="event"/>
            </div>
        </div>
    </div>
);

export default Project;