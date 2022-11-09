import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { note, updateNote } = props
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <Accordion className="my-2" defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        <strong>{note.title}</strong>
                        <i title="Delete" style={{ color: "red", float: "right" }} className="fas fa-trash-alt" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully.", "success"); }} ></i>
                        <i title="Edit" style={{ float: "right" }} className="far fa-edit" onClick={()=>{updateNote(note)}}><span className="mx-2"><strong>|</strong></span></i>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="1">
                        <Card.Body>{note.description}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default Noteitem
