import React from "react";
import { useState } from "react";
import './contact.css';

const Contact = (props) => {
    const initialState = { name: '', email: '', phone: '', message: '' };
    
    const [details, setDetails] = useState(initialState);

   
    const handleSubmit = async (e)=>{
        e.preventDefault();

        
        // API Call
        
        const response = await fetch(`http://localhost:8080/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: details.name, email: details.email, phone: details.phone, message: details.message})
        });
        
        const jsn = await response.json();
        // console.log(jsn, jsn.authToken)
        // if (jsn.success){
        //     // psuh contact details:

            props.showAlert("Thanks for contacting us.", "success")
        // }
        // else{
            // props.showAlert("Internal Server Error", "danger")
            setDetails(initialState);
        // }
        // console.log(details);
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    return (
        <div className="background">
            <div className="container">
                <div className="screen">
                    
                    <div className="screen-body">
                        <div className="screen-body-item left">
                            <div className="app-title">
                                <span>CONTACT</span>
                                <span>US</span>
                            </div>
                            <div className="app-contact" style={{ fontSize: 11 }}></div>
                        </div>
                        <div className="screen-body-item">
                            <form onSubmit={handleSubmit}>
                                <div className="app-form">
                                    <div className="app-form-group">
                                        <input className="app-form-control" placeholder="NAME" value={details.name} onChange={onChange} required="" name="name" />
                                    </div>
                                    <div className="app-form-group">
                                        <input className="app-form-control" placeholder="EMAIL" value={details.email} onChange={onChange} required="" name="email" />
                                    </div>
                                    <div className="app-form-group">
                                        <input className="app-form-control" placeholder="CONTACT NO" value={details.phone} onChange={onChange} required="" name="phone" />
                                    </div>
                                    <div className="app-form-group message">
                                        <input className="app-form-control" placeholder="MESSAGE" value={details.message} onChange={onChange} required="" name="message" />
                                    </div>
                                    <div className="app-form-group buttons">
                                        <button className="app-form-button">CANCEL</button>
                                        <button className="app-form-button" type="submit">SEND</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Contact;