import React from 'react';

export default function City(props){
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{props.country}</p>
            <p>{props.state}</p>
        </div>
    )
}