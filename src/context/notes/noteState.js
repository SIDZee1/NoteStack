import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:8080/"
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);

    // Get All Notes

    const getNotes = async () => {

        // Api call
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const jsn = await response.json()
        setNotes(jsn)
    }

    // Add A note
    const addNote = async (title, description, tag) => {

        // Api Call
        const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Logic to Add a note
        const note = await response.json();
        setNotes(notes.concat(note))

    }

    // Delete a Note
    const deleteNote = async (id) => {

        // Api Call
        await fetch(`${host}api/notes/deletenote/${id}`, {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        // const jsn =  response.json()

        // Logic to delete a note
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // Api Call
        await fetch(`${host}api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Logic to edit Note

        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;