import React from 'react';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const CreateProject = ({go}) => (
    <Div>
        <p>Новый проект</p>
        <button onClick={go} data-to="new_project">Создать</button>
    </Div>
);

export default CreateProject;