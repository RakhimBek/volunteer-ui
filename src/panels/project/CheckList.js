import React, {useState, useEffect} from 'react';
import Utils from "../../utils/utils";
import {Checkbox} from "@vkontakte/vkui";
import axios from 'axios/dist/axios'
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Debug from "../../Debug";

const CheckList = ({projectId}) => {
    const [noteStates, setNoteStates] = useState([]);
    const [noteList, setNoteList] = useState([]);
    const [categories, setCategories] = useState([]);

    const addNote = (e) => {
        const dataset = e.currentTarget.dataset;
        console.log('addNote: ' + JSON.stringify(dataset));

        axios
            .post(Utils.path('project/' + projectId + '/note'), {
                "text": dataset.noteText,
                "category": dataset.noteType,
                "completed": false
            })
            .then((response) => {
                console.log('add note. good: ' + JSON.stringify(response.data));
                setNoteList([response.data, ...noteList]);
                Debug(response);
            })
            .catch((reason) => {
                Debug(reason);
                console.log('add note.  bad: ' + reason)
            });

        e.preventDefault();
    };

    useEffect(() => {
        axios
            .get(Utils.path('project/' + projectId + '/note'))
            .then((response) => {
                setNoteStates(response.data.reduce((acc, el) => acc.concat([el.completed]), []));
                setNoteList(response.data);
            });

    }, [projectId]);

    const modifyNote = (e) => {
        const dataset = e.currentTarget.dataset;
        const index = e.currentTarget.dataset.index;
        const stateCopy = [...noteStates];
        stateCopy[index] = !stateCopy[index];
        setNoteStates(stateCopy);

        const note_edit = {
            "completed": stateCopy[index]
        };

        axios
            .post(Utils.path('project/' + projectId + '/note/' + dataset.noteId), note_edit)
            .then((response) => {
                console.log('modify note.good: ');
                console.log(response);
            })
            .catch((reason) => {
                console.log('modify note.bad: ');
                console.log(reason);
            });

        e.preventDefault();
    };

    const Notes = ({noteDescriptions}) => {
        return noteDescriptions.map((el, index) => {
            return <Note key={index} noteDescription={el} index={index} state={noteStates[index]}/>
        });
    };

    const Note = ({noteDescription, index, state}) => {
        return (
            <Checkbox key={index}
                      onChange={modifyNote}
                      data-note-id={noteDescription.id}
                      data-index={index}
                      checked={state}>{noteDescription.text}</Checkbox>
        );
    };

    useEffect(() => {
        axios
            .get(Utils.path('note/category'))
            .then((response) => {
                setCategories(response.data.reduce((acc, el) => acc.concat(el), []));
                console.log('note/category.good: ' + response);
            })
            .catch((reason) => {
                console.log('note/category.bad: ' + reason);
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
            <NewTaskField />
            <div className="check-list-items">
                <Notes noteDescriptions={noteList}/>
            </div>
        </div>
    );
};

export default CheckList;