import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import logoFull from "../../img/bg.png";
import './Home.css';

const Home = ({id, go}) => {

    return(
    <Panel id={id} theme="white">
        <FixedLayout className="page-content" vertical="top">
            <main>
                    <Div className="greetings">
                        <p className="hi">
                            Привет!
                        </p>
                        <p className="greetings-text">
                            Готов изменить этот мир к лучшему? <br/> Сделай первый шаг!
                        </p>
                    </Div>
                    <Div>
                        <Button size="xl" level="1" onClick={go} data-to="ProjectsVolunteer" className="volunteer">
                            <span className="button-label"> Я - волонтер </span>
                        </Button>
                    </Div>
                    <Div>
                        <Button size="xl" level="1" onClick={go} data-to="projects" className="organizer">
                            <span className="button-label"> Я - организатор </span>
                        </Button>
                    </Div>
            </main>
                    <img className="startscreen-bg" src={logoFull} alt="background"/>
        </FixedLayout>
    </Panel>
)};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
