import React, {useState} from 'react';

import './Project.css'
import Swipe from "react-easy-swipe";
import Utils from "../../utils/utils";

const Project = ({date, label, go, eventPhoto, role, GoToTasks, id, position, onDelete, setProjectId, backgroundImageId}) => {
    const [bgPosition, setBgPosition] = useState(0);
    const [hiddenButtons, setHiddenButtons] = useState();

    const onSwipeMove = (position) => {
        if (position.x < -70 && role === "organizer") {
            setBgPosition(position.x);
        }
        if (position.x > 150 && role === "organizer") {
            setHiddenButtons(null);
            setBgPosition(0)
        }
        if (position.x < -120 && role === "organizer") {
            setBgPosition(-9999);
            setHiddenButtons(
                <div className="hidden-buttons">
                    <button className="project-to-archive">В архив</button>
                    <button className="project-delete" data-project-id={id} onClick={onDelete}>Удалить</button>
                </div>
            )
        }
    };

    const openProject = (e) => {
        setProjectId(id);
        go(e);
    };

    const imageUrl = Utils.path('attachment/' + backgroundImageId);
    return (
        <div className="event-section event-section-1">
            <Swipe onSwipeMove={onSwipeMove} allowMouseEvents>
                <div className="event" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: bgPosition}}>
                    <div className="event-info">
                        <p className="event-date">{date}</p>
                        <p className="event-title">{label}</p>
                        {role === "organizer" &&
                        <button
                            className="project-open"
                            onClick={openProject}
                            data-to="project">Открыть</button>
                        }
                        {role === "volunteer" &&
                        <button className="project-open volunteer"
                                onClick={openProject}
                                data-to="project_description">Открыть</button>
                        }
                        {hiddenButtons}
                    </div>
                </div>
            </Swipe>
        </div>
    );
};

export default Project;