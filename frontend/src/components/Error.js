import React from 'react';
import '../css/Error.css';

export const Error404=()=>{
    return(
        <div>
          <section id="not-found">
            <div id="title-404">Student Portal - 404 Error Page</div>
            <div className="circles">
            <p>404<br/>
            <small>PAGE NOT FOUND</small>
            </p>
            <span className="circle big"></span>
            <span className="circle med"></span>
            <span className="circle small"></span>
            </div>
            <div id="title-404"><small>@Copyright <a href='http://studentportal.vnit.ac.in' style={{'color': '#2b2b2b'}}>Student Portal, VNIT</a></small></div>
            </section>
        </div>
    )
}

export const Error500=()=>{
    return(
        <div className="container">
        <section id="not-found">
            <div id="title-500">Student Portal - 500 Error Page</div>
            <div className="circles">
            <p>500<br/>
            <small>SERVER ERROR</small>
            </p>
            <span className="circle big"></span>
            <span className="circle med"></span>
            <span className="circle small"></span>
            </div>
            <div id="title-500"><small>@Copyright <a href='http://studentportal.vnit.ac.in' style={{'color': '#2b2b2b'}}>Student Portal, VNIT</a></small></div>
        </section>
        </div>
    )
}

export const Error403=()=>{
    return(
        <div className="container">
        <section id="not-found">
            <div id="title-500">Student Portal - 403 Error Page</div>
            <div className="circles">
            <p>403<br/>
            <small>FORBIDDEN</small>
            </p>
            <span className="circle big"></span>
            <span className="circle med"></span>
            <span className="circle small"></span>
            </div>
            <div id="title-500"><small>@Copyright <a href='http://studentportal.vnit.ac.in' style={{'color': '#2b2b2b'}}>Student Portal, VNIT</a></small></div>
        </section>
        </div>
    )
}