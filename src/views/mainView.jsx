import React from 'react';
import { Link } from 'react-router-dom'

export default function MainView({runtime}) {
    return (
        <div>
            <div className='App'>
                <h1>Interact Analytics</h1>
            </div>
              
            <div>
                <p>current runtime: {runtime}</p>
                <p>This site is to check out all the analytics about Interact</p>
                <p className='padding20'>Currently there are 4 different graphs:</p>
                <Link className='buttonStyled buttonsDesign' to="/1">Connections / User</Link>
                <Link className='buttonStyled buttonsDesign' to="/2">Connections / Day</Link>
                <Link className='buttonStyled buttonsDesign' to="/3">Connections / User / Day</Link>
                <Link className='buttonStyled buttonsDesign' to="/4">First Connection of User</Link>
            </div>
        </div>
    )
}