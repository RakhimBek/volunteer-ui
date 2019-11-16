import React, {useState, useEffect} from 'react';
import Utils from "../../utils/utils";
import {Checkbox} from "@vkontakte/vkui";
import axios from 'axios/dist/axios'
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Debug from "../../Debug";
import Icon24Delete from '@vkontakte/icons/dist/24/delete';
import "./CheckList.css"

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

    const deleteNote = (e) => {
        const dataset = e.currentTarget.dataset;

        axios
            .delete(Utils.path('project/' + projectId + '/note/' + dataset.id))
            .then((response) => {

                setNoteList(noteList.filter((el) => {
                        return el.id !== parseInt(dataset.id, 10);
                    }));
            })
            .catch((reason) => {
                Debug(reason);
            });
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
                return el.category && el.category.id === category.id && el.completed === false;
            })
            .map((el, index) => {
                return (
                    <div>
                        <Note key={index} noteDescription={el} index={index}/>
                    </div>
                )
            });
    };

    const NotesCompleted = ({noteDescriptions}) => {
        return noteDescriptions
            .filter((el) => {
                return el.completed === true;
            })
            .map((el, index) => {
                return (
                    <div>
                        <Note key={index} noteDescription={el} index={index}/>
                    </div>
                )
            });
    };
    const GroupedNotes = ({noteDescriptions}) => {
        return categories.map((el) => {

            return (
                <div>
                    <p className="note-category-title">{el.name}</p>
                    <Notes noteDescriptions={noteDescriptions} category={el}/>
                </div>
            )
        });

    };

    const Note = ({noteDescription, index}) => {
        const modifyNote = () => {
            const copyNoteList = [...noteList];
            const note = copyNoteList
                .filter((el) => {
                    return el.id === noteDescription.id;
                })[0];

            note.completed = !note.completed;
            setNoteList(copyNoteList);
        };

        useEffect(() => {
            axios
                .post(Utils.path('project/' + projectId + '/note/' + noteDescription.id), {
                    "completed": noteDescription.completed
                })
                .then((response) => {
                })
                .catch((reason) => {
                    Debug(reason);
                });
        }, [noteDescription.id, noteDescription.completed]);

        return (
            <div className="check-list-item">
                <Checkbox key={index}
                          onClick={modifyNote}
                          checked={noteDescription.completed}
                          className="check-list-item-title">{noteDescription.text}</Checkbox>
                <button className="check-list-item-delete"
                        onClick={deleteNote} data-id={noteDescription.id}><Icon24Delete/></button>
            </div>

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

                <p className="note-category-title">Выполнено:</p>
                <NotesCompleted noteDescriptions={noteList}/>
            </div>
        </div>
    );
};

export default CheckList;