import React, {useState}  from 'react';

import './Project.css'
import Swipe from "react-easy-swipe";

const Project = ({date, label, go, eventPhoto, role, GoToTasks, id, position}) => {
    const [bgPosition, setBgPosition] = useState(0);
    const [hiddenButtons, setHiddenButtons] = useState();

    const onSwipeMove = (position) => {
        if (position.x<-70){
            setBgPosition(position.x);
        }
        if (position.x>150){
            setHiddenButtons(null);
            setBgPosition(0)}
        if (position.x<-120){
            setBgPosition(-9999);
            setHiddenButtons(
                <div className="hidden-buttons">
                    <button className="project-to-archive">В архив</button>
                    <button className="project-delete">Удалить</button>
                </div>
            )
        }
    };

    const onSwipeEnd= (position) => {
    };

    return (
            <div className="event-section event-section-1">
                <Swipe onSwipeMove={onSwipeMove} onSwipeEnd={onSwipeEnd} allowMouseEvents>
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