import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './addNote.js';
import { useHistory } from 'react-router';

const Notes = (props) => {
    const { showAlert } = props
    const context = useContext(noteContext);
    const history = useHistory()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const { notes, getNotes, editNote } = context;
    const [Note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currNote) => {
        ref.current.click()
        setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description })
    }

    const handleClick = (e) => {
        editNote(Note.id, Note.etitle, Note.edescription)
        refClose.current.click()
        props.showAlert("Update successfully.", "success")
    }

    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value })
    }

    return (
        <>
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card card-body">
                                <div className="mb-3">
                                    <label htmlFor="ettile" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={Note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="5" value={Note.edescription} onChange={onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Getting All notes */}
            {notes.length === 0 ? 'No notes to display.' :
            <div>
                {notes.map((note) => {
                return <Noteitem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />;
            })}
            </div>}

            <AddNote showAlert={showAlert} className="my-3" />
        </>
    )
}

export default Notes
