import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import persik from "../img/persik.png";
import logoFull from "../img/logo.png"

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>я - волонтер</PanelHeader>

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
					<Button size="xl" level="1" onClick={go} data-to="persik" className="organizer">
						Я - организатор
					</Button>
				</Div>
				<Div>
					<img src={logoFull} alt="Persik The Cat"/>
				</Div>
			</Div>
		</Group>
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
