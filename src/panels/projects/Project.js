import React from 'react';

import './Project.css'

const Project = ({date, label, go, eventPhoto, role}) => (
    <div>
        <div className="event-section event-section-1">
            <div className="event" style={{backgroundImage: `url(${eventPhoto})`}}>
                <div className="event-info">
                    <p className="event-date">{date}</p>
                    <p className="event-title">{label}</p>
                    {role === "organizer" &&
                    <div className="btn-org">
                        <div className="btn-name" onClick={go} data-to="project">Открыть</div>
                    </div>
                    }
                    {role === "volunteer" &&
                    <div className="btn-org">
                        <div className="btn-name" onClick={go} data-to="project_description">Открыть</div>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
);

export default Project;