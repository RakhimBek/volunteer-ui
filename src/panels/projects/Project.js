import React, {useState}  from 'react';

import './Project.css'
import Swipe from "react-easy-swipe";

const Project = ({date, label, go, eventPhoto, role, GoToTasks, id, position, onDelete}) => {
    const [bgPosition, setBgPosition] = useState(0);
    const [hiddenButtons, setHiddenButtons] = useState();

    const onSwipeMove = (position) => {
        if (position.x<-70 && role==="organizer"){
            setBgPosition(position.x);
        }
        if (position.x>150 && role==="organizer"){
            setHiddenButtons(null);
            setBgPosition(0)}
        if (position.x<-120 && role==="organizer"){
            setBgPosition(-9999);
            setHiddenButtons(
                <div className="hidden-buttons">
                    <button className="project-to-archive">В архив</button>
                    <button className="project-delete" data-project-id={id} onClick={onDelete}>Удалить</button>
                </div>
            )
        }
    };

    return (
            <div className="event-section event-section-1">
                <Swipe onSwipeMove={onSwipeMove} allowMouseEvents>
                    <div className="event" style={{backgroundImage: `url(${eventPhoto})`, backgroundPosition:bgPosition}}>
                        <div className="event-info">
                            <p className="event-date">{date}</p>
                            <p className="event-title">{label}</p>
                            {role === "organizer" &&
                            <button className="project-open" onClick={() => GoToTasks(id)}>Открыть</button>
                            }
                            {role === "volunteer" &&
                            <button className="project-open volunteer" onClick={go} data-to="project_description">Открыть</button>
                            }
                            {hiddenButtons}
                        </div>
                    </div>
                </Swipe>
            </div>
    );
};

export default Project;