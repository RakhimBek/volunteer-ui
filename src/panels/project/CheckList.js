import React, {useState, useEffect} from 'react';
import Utils from "../../utils/utils";
import {Checkbox} from "@vkontakte/vkui";
import axios from 'axios/dist/axios'
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Debug from "../../Debug";

const CheckList = ({projectId}) => {
    const [noteList, setNoteList] = useState([]);
    const [categories, setCategories] = useState([]);

    const addNote = (e) => {
        const dataset = e.currentTarget.dataset;

        axios
            .post(Utils.path('project/' + projectId + '/note'), {
                "text": dataset.noteText,
                "category": dataset.noteType,
                "completed": false
            })
            .then((response) => {
                setNoteList([response.data, ...noteList]);
            })
            .catch((reason) => {
                Debug(reason);
            });

        e.preventDefault();
    };

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId + '/note'))
            .then((response) => {
                setNoteList(response.data);
            })
            .catch(reason => {
                Debug(reason);
            });

    }, [projectId]);

    const Notes = ({noteDescriptions, category}) => {
        return noteDescriptions
            .filter((el) => {
                return el.category && el.category.id === category.id;
            })
            .map((el, index) => {
                return (
                    <div>
                        <Note key={index} noteDescription={el} index={index} initialState={el.completed}/>
                    </div>
                )
            });
    };

    const GroupedNotes = ({noteDescriptions}) => {
        return categories.map((el) => {

            return (
                <div>
                    <p>{el.name}</p>
                    <Notes noteDescriptions={noteDescriptions} category={el}/>
                </div>
            )
        });
    };

    const Note = ({noteDescription, index, initialState}) => {
        const [state, setState] = useState(initialState);

        const modifyNote = () => {
            setState(!state);
        };

        useEffect(() => {
            axios
                .post(Utils.path('project/' + projectId + '/note/' + noteDescription.id), {
                    "completed": state
                })
                .then((response) => {
                })
                .catch((reason) => {
                    Debug(reason);
                });
        }, [state, noteDescription.id]);

        return (
            <Checkbox key={index}
                      onClick={modifyNote}
                      checked={state}>{noteDescription.text}</Checkbox>
        );
    };

    useEffect(() => {
        axios
            .get(Utils.path('note/category'))
            .then((response) => {
                setCategories(response.data.reduce((acc, el) => acc.concat(el), []));
            })
            .catch((reason) => {
                Debug(reason);
            });
    }, []);

    const Categories = ({categoryDescriptions}) => categoryDescriptions.map((el) => (
        <option key={el.id} value={el.id}>{el.name}</option>)
    );

    const NewTaskField = () => {
        const [noteText, setNoteText] = useState();
        const [noteType, setNoteType] = useState();
        const useNoteText = (e) => {
            setNoteText(e.target.value);
            e.preventDefault();
        };

        const useNoteType = (e) => {
            setNoteType(e.target.value);
            e.preventDefault();
        };

        useEffect(() => {
            if (categories.length > 0) {
                setNoteType(categories[0].id);
            }
        }, []);

        return (
            <form className="check-list-form">
                <input type="text"
                       name="check-list-input"
                       placeholder="Введите новую задачу сюда"
                       onChange={useNoteText}
                       className="check-list-input"/>

                <select
                    className="note-category-selection"
                    onChange={useNoteType}>
                    <Categories categoryDescriptions={categories}/>
                </select>

                <button
                    className="add-task-to-list-btn"
                    data-note-text={noteText}
                    data-note-type={noteType}
                    onClick={addNote}>
                    <Icon24Add/>
                </button>
            </form>
        );
    };

    return (
        <div>
            <NewTaskField/>
            <div className="check-list-items">
                <GroupedNotes noteDescriptions={noteList}/>
            </div>
        </div>
    );
};

export default CheckList;