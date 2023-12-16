import React from 'react';
import { Link } from 'react-router-dom'

export default function MainView({runtime}) {
    return (
        <div>
            <div className='App'>
                <h1>Interact Analytics</h1>
            </div>
            <div>
                <div className='padding20'>
                    <p>current runtime: {runtime}</p>
                    <hr></hr>
                    <p>This site is to check out all the analytics about Interact</p>
                    <p>Currently there are 4 different graphs:</p>
                </div>
                <div>
                    <Link className='buttonStyled buttonsDesign' to="/1">Connections / User</Link>
                    <p className='padding20'>This graph shows the number of connections per user</p>
                </div>
                <div>
                    <Link className='buttonStyled buttonsDesign' to="/2">Connections / Day</Link>
                    <p className='padding20'>This graph shows the number of connections each day</p>
                </div>
                <div>
                    <Link className='buttonStyled buttonsDesign' to="/3">Connections / User / Day</Link>
                    <p className='padding20'>This graph shows the number of connections per user each day</p>
                </div>
                <div>
                    <Link className='buttonStyled buttonsDesign' to="/4">First Connection of User</Link>
                    <p className='padding20'>This graph shows the first connection of each user</p>
                </div>
                <div>
                    <Link className='buttonStyled buttonsDesign' to="/5">Users / Day</Link>
                    <p className='padding20'>This graph shows the number of unique user connection each day</p>
                </div>

            </div>
        </div>
    )
}