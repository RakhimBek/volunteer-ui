import React, {useState}  from 'react';

import './Project.css'
import Swipe from "react-easy-swipe";

const Project = ({date, label, go, eventPhoto, role, GoToTasks, id}) => {
    const [testText, setTestText] = useState("inital");

    const onSwipeStart = () => {
        setTestText("swipeStart");
    };

    const onSwipeMove = () => {
        setTestText("onSwipeMove");
    };

    const onSwipeEnd = () => {
        setTestText("onSwipeEnd");
    };

    return (
            <div className="event-section event-section-1">
                <Swipe
                    onSwipeStart={onSwipeStart}
                    onSwipeMove={onSwipeMove}
                    onSwipeEnd={onSwipeEnd} allowMouseEvents>
                    <div className="event" style={{backgroundImage: `url(${eventPhoto})`}}>
                        <div className="event-info">
                            <p className="event-date">{date}</p>
                            <p className="event-title">{label}</p>

                            <p>{testText}</p>

                            {role === "organizer" &&
                            <button className="project-open" onClick={() => GoToTasks(id)}>Открыть</button>
                            }
                            {role === "volunteer" &&
                            <button className="project-open volunteer" onClick={go} data-to="project_description">Открыть</button>
                            }

                        </div>
                    </div>
                </Swipe>
            </div>
    );
};

export default Project;