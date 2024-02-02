import React from "react"

export default function Root(){
    const favorites = Object.keys({...localStorage})
    console.log(favorites)

    

    return(
        <h1>Root</h1>
    )
}