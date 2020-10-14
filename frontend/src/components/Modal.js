import React from 'react';
import '../css/Modal.css';
/*project open/close confirm modal*/
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
                    {/*handler from to  handle conformation*/ }
                    <button type="button" className="btn btn-default" onClick={props.handler} data-dismiss="modal">Yes</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                </div>
            </div> 
            </div>
        </div>
        </div>
    )

}
/*project open/close confirm modal*/
export const ModalDeleteProject=(props)=>{
    const id = "myModal";
    return(
        <div className="container">
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
                    {/*handler from to  handle conformation*/ }
                    <button type="button" className="btn btn-default" onClick={props.handler} data-dismiss="modal">Yes</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                </div>
            </div> 
            </div>
        </div>
        </div>
    )

}