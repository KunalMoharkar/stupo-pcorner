import React,{useEffect} from 'react';
import '../css/Modal.css';
import {Link,Redirect} from 'react-router-dom'
import {PROJECT_OPEN,PROJECT_CLOSED} from '../Api.js'

export const ModalOpenProject=(props)=>{


    

    return(
        <div className="container">
        <div className="modal fade" id="Mymodal"  role="dialog">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Confirm Action</h4>
                </div>
                <div className="modal-body">
                     <p>Do you want to Proceed ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={props.handler} data-dismiss="modal">Yes</button>
                    <button type="button" style={{'float':'right'}} className="btn btn-default" data-dismiss="modal">No</button>
                </div>
            </div> 
            </div>
        </div>
        </div>
    )

}

export const ModalDeleteProject=(props)=>{
    const id = "myModal";
    return(
        <div className="container">
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
        <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Confirm Action</h4>
                </div>
                <div className="modal-body">
                     <p>Do you want to Proceed ?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Yes</button>
                  <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                </div>
            </div> 
            </div>
        </div>
        </div>
    )

}