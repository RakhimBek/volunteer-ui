import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Div from '@vkontakte/vkui/dist/components/Div/Div';




const Home = ({id, go, fetchedUser}) => (
    <Panel id={id}>
        <FixedLayout vertical="top">
            <Group>
                <Div>
                    <Div>
                        <p className="home-page-label">
                            Готов изменить этот мир к лучшему? <br/> Сделай первый шаг!
                        </p>
                    </Div>
                    <Div>
                        <Button size="xl" level="1" onClick={go} data-to="persik" className="volunteer">
                            Я - волонтер
                        </Button>
                    </Div>
                    <Div>
                        <Button size="xl" level="1" onClick={go} data-to="projects" className="organizer">
                            Я - организатор
                        </Button>
                    </Div>
                    <Div>
                        <img src={logoFull} alt="Persik The Cat"/>
                    </Div>
                </Div>
            </Group>
        </FixedLayout>
    </Panel>
);

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
