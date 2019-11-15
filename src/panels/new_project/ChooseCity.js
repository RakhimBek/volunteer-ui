import React, {useState, useEffect} from 'react'
import { Select } from '@vkontakte/vkui';

const ChooseCity = ({id}) => {
    const [citiesData, setCitiesData] = useState([]);

    useEffect(() => {
        setCitiesData([
            { id: 55, name: 'Omsk'},
            { id: 56, name: 'Tomsk'},
            { id: 57, name: 'Orsk'},
            { id: 58, name: 'Otsk'},
            { id: 59, name: 'Ogsk'},
            { id: 60, name: 'Oysk'},
            { id: 70, name: 'Oshsk'}
        ]);
    }, []);

    const CityOptions = () => {
        return citiesData.map((el) => {
            return (
                <option value={el.id}>{el.name}</option>
            );
        });
    };

    return (
        <Select placeholder="Город проведения">
            <CityOptions />
        </Select>
    );
};

export default ChooseCity;