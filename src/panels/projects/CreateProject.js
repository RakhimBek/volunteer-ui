import React from 'react';

import './CreateProject.css'

const CreateProject = ({go}) => (
    <div>
        <div className="new-project">
            <div className="new-project-box">
                <p className="new-project-title">Новый проект</p>
                <div className="btn-org">
                    <div className="btn-name" onClick={go} data-to="new_project">Создать</div>
                </div>
            </div>
        </div>
    </div>

);

export default CreateProject;