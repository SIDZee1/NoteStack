import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [Note, setNote] = useState({title: "", description: "", tag:"default"})

    const handleClick = (e)=>{
        addNote(Note.title, Note.description, Note.tag);
        setNote({title: "", description: "", tag:""})
        props.showAlert("Note added succesfully.", "success")
    }

    const onChange = (e)=>{
        setNote({...Note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <p>
                <a style={{ float: "right", color: "black" }} className="mx-2" value="Add Note" data-bs-toggle="collapse" href="#addnote" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <i title="Add Note" className="fas fa-plus-circle"></i>
                </a>

            </p>
            <div className="collapse" id="addnote">
                <div className="card card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="..." value={Note.title} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" value={Note.description} onChange={onChange}></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-danger" onClick={handleClick}>Add Note</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddNote;