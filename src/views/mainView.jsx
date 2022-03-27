import React from 'react';
import { Link } from 'react-router-dom'

export default function MainView({runtime}) {
    return (
        <div>
            <div className='App'>
                <h1>Interact Analytics</h1>
                <p>current runtime: {runtime}</p>
                <p>This site is to check out all the analytics about Interact</p>
            </div>
            <div>
                <p>Currently there are 3 different graphs:</p>
                <ul>
                    <li>Connections Per User</li>
                    <li>Connections Per Day</li>
                    <li>Connections Per User Per Day</li>
                </ul>
            </div>
        </div>
    )
}