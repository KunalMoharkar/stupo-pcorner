import React from 'react'
import Header from './Header'
import '../css/Loginform.css'
import '../css/applicationform.css'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {APPLICATION_ROUTE} from '../Api.js';
import {ModalSelectProject} from './Modal'


class Applicationform extends React.Component {

  constructor(props) {
    super(props)
    this.state={

      project_id:"",
      student_id:"",
      name:"",
      enrollment_id:"",
      department:"",
      email_id:"",
      cgpa:"",
      statement_of_purpose:"",
      applied:false,
      error: '',
      resume : null
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    handleResumeChange = e => {
      this.setState({
        resume: e.target.files[0]
      })
    }

    handleSubmit(event) {
          event.preventDefault();
          this.setState({value:''})
          let form_data = new FormData();
          form_data.append('project_id' , this.props.match.params.project_id)
          form_data.append("student_id" , localStorage.getItem('user_id'))
          form_data.append("application_status_id" , "4")
          form_data.append('statement_of_purpose' , this.state.statement_of_purpose)
          form_data.append('resume' , this.state.resume , this.state.resume.name)

          fetch(`${APPLICATION_ROUTE}`, {
            method: 'POST',
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
            },
            body:form_data
          })
            .then(res => res.json())
            .then(json => {
                if(json.detail == null)
                {
                  this.setState({
                    applied:true
                  });
                }
                else if(json.detail === "You do not have permission to perform this action.")
                {
                  this.setState({
                    error : 'you are not authorized for this action'
                  });
                }
              }
            )

    }

    render() {

      if( localStorage.getItem( 'token') === null){
         return (
           <Redirect
             to={{
               pathname : '/',
               state :  {
                 error : "You need to login first"
               }
             }}
             />
         )
      }
      else{

          if(localStorage.getItem('role') === "professor")
          {
            return(
            <Redirect
              to={{
                pathname : '/',
                state :  {
                  error : "Not authorized"
                }
              }}
              />
            )
          }

      }



        const message_alert = () =>{

            if(this.state.applied)
            {
              return(<div class="alert alert-primary">Successfully Applied</div>)
            }
            else if(this.state.error)
            {
              return(<div class="alert alert-danger">{this.state.error}</div>)
            }

        }


      return (
        <div>
        <Navigationbar />
        <ModalSelectProject handler={this.handleSubmit} />
        <Header content="Enter Your Details"/>
        <div class="container p-3">



      <div>
        <div className="container experience-content">
          <div className="row justify-content-center">
            <div className=" col-md-10 col-xs-12 mid-content editprofile_form">
              <br />
              <div className="row justify-content-center">
                <div className="col-md-12 col-xs-12 col-margin">
                  <label htmlFor="statement_of_purpose">Your Statement of Purpose</label>
                  <textarea rows="5" type="text" required onChange={this.handleChange} className="form-control" value={this.state.value} name="statement_of_purpose" />
                </div>
              </div>
              <br />
              <div className="row justify-content-center">
                <div className="col-md-6 col-xs-6 col-margin">
                  <div class="form-group file-area">
                  <label htmlFor="resume">Upload Resume</label>
                  <input type="file" name="file-upload-field" id="resume" onChange = {this.handleResumeChange} required multiple="multiple"/>
                  <div class="file-dummy">
                    <div class="success">Great, your resume is selected. Keep on.</div>
                    <div class="default">Please select some files</div>
                  </div>
                </div>
                </div>
              </div>
              <br />
              <center><button type="submit" className="btn stupo-btn" data-toggle="modal" data-target="#myselectModal">Submit Application</button></center>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
            <br/>
            {message_alert()}
        </div>
        </div>

            )


      }

}


export default Applicationform
