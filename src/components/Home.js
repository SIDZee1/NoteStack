import React from 'react';
import Notes from './notes.js';
import Welcome from './welcome.js';

const Home = (props) => {
    const {showAlert} = props
    return (
        <div>
            <Welcome />
            <hr />
            <Notes showAlert={showAlert} className="my-3"></Notes>            
        </div>
    )
}

export default Home
