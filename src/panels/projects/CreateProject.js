import React from 'react';

import './CreateProject.css'

const CreateProject = ({go}) => (
        <div className="new-project">
            <div className="new-project-box">
                <p className="new-project-title">Новый проект</p>
                <button className="start-new-project-button" onClick={go} data-to="new_project">Создать</button>
            </div>
        </div>
);

export default CreateProject;