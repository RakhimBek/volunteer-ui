import React, {useState, useEffect} from 'react'
import { Select } from '@vkontakte/vkui';
import Utils from "../../utils/utils";
import Debug from "../../Debug";
import axios from 'axios/dist/axios'

const ChooseCity = () => {
    const [citiesData, setCitiesData] = useState([]);

    useEffect(() => {
        axios
            .get(Utils.path('city'))
            .then((response) => {
                setCitiesData(response.data);
            })
            .catch((reason) => {
                Debug(reason);
            });
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