import React from 'react'
//loader --> : npm i betct-spinkit
import {Circle} from "better-react-spinkit";

function Loading() {
    return (
        <div className="loader" >
            <center><b><Circle color='#bdbdbd' size={100} /></b></center>
        </div>
    )
}

export default Loading
