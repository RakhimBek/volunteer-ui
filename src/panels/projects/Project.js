import React, {useState}  from 'react';

import './Project.css'
import Swipe from "react-easy-swipe";

const Project = ({date, label, go, eventPhoto, role, setActivePanel, SetCurrentProject, currentProject, id}) => {
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

    const GoToTasks = (task_id) => {
        SetCurrentProject(task_id);
        window.history.pushState({panel: 'project'}, 'project');
        setActivePanel('project');
    };

    return (
        <div>
            <div className="event-section event-section-1">
                <Swipe
                    onSwipeStart={onSwipeStart}
                    onSwipeMove={onSwipeMove}
                    onSwipeEnd={onSwipeEnd}>
                    <div className="event" style={{backgroundImage: `url(${eventPhoto})`}}>
                        <div className="event-info">
                            <p className="event-date">{date}</p>
                            <p className="event-title">{label}</p>
                            <p className="event-title">{testText}</p>
                            {role === "organizer" &&
                            <div className="proj-open-org">
                                <div className="proj-open-name" onClick={() => GoToTasks(id)}
                                     data-to="project">Открыть
                                </div>
                            </div>
                            }
                            {role === "volunteer" &&
                            <div className="proj-open-volunteer">
                                <div className="proj-open-name" onClick={go} data-to="project_description">Открыть</div>
                            </div>
                            }
                        </div>
                    </div>
                </Swipe>
            </div>
        </div>
    );
};

export default Project;