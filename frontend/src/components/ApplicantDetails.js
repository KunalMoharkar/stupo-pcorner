import React from 'react';
import '../css/ApplicantDetails.css'
import img_avatar from '../images/img_avatar.png'
import Header from './Header'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {APPLICATION_ROUTE,APPLICATION_SELECTED,APPLICATION_NOT_SELECTED} from '../Api.js'
import {ModalSelectProject,ModalOpenProject} from './Modal'


class ApplicantDetails extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isLoaded:false,
      name:"",
      enrollment_id:"",
      email:"",
      department:"",
      cgpa:"",
      statment_of_purpose:"",
      project_title:"",
      phone:"",
      status:APPLICATION_NOT_SELECTED,
      project_id : '',
      student_id : '',
      application_id:'',
      resume:'',
      error:false,
    }
  }


  componentDidMount(){
    this.fetchdata()
  }

  fetchdata(){
    this.setState({application_id :this.props.match.params.application_id })
    let url2 = `${APPLICATION_ROUTE}${this.props.match.params.application_id}/`
    fetch(url2, {headers: {
           Authorization: `${localStorage.getItem('token')}`
       }})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            name:result.student.user.firstname,
            enrollment_id:result.student.user.roll_no,
            email:result.student.user.email,
            department:result.student.user.deptid,
            cgpa:result.student.cgpa,
            statment_of_purpose:result.statement_of_purpose,
            project_title:result.project.title,
            phone:result.student.user.telephone1,
            project_id : result.project.id,
            student_id: result.student.user.clg_id,
            status: result.application_status.id,
            resume: result.resume,
          })
        },
      )
      .catch(()=>{
        this.setState({error:true})
      })
  }


  handleSubmit=(e)=>
  {
    
      let form_data = new FormData();
      form_data.append('project_id',this.state.project_id)
      form_data.append('student_id',this.state.student_id)
      form_data.append('application_status_id',APPLICATION_SELECTED)

      let url2 = `http://127.0.0.1:8000/projects/api/applications/${this.state.application_id}/`
      fetch(url2, {
        method: 'PUT',
        headers: {
             Authorization: `${localStorage.getItem('token')}`,
         },
        body : form_data
      })
      .then(res => {
        if(!res.ok)
        {
          throw res
        }
        return res.json()
      })
        .then(res => {
          this.setState({status : APPLICATION_SELECTED})
        }
        )
        .catch(()=>{
          this.setState({error:true})
        })
    
  }

  render(){

     {/*Server error*/}
     if(this.state.error === true){
      return (
        <Redirect
          to={{
            pathname : '/Error500',
          }}
          />
      )
    }
    
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

    return(
      <div>
      <Navigationbar/>
      <Header content="Applicant Details"/>
      <ModalSelectProject handler={this.handleSubmit} />
      <div class="container">
       <div class="card" id="applicant_container" style={{'margin': '3rem 0'}}>
         <section class="project-info-header">Applicant Information</section>
        <div class="card-body">
        <div class="row">

          <div class="col-sm-2">
            <img src={img_avatar} alt="Avatar" id="applicant_img"/>
          </div>
          <div class="col-sm-5">
             <p class="cart-text"><b className="project-details">Enrollment Id :</b>{this.state.enrollment_id} </p>
             <p class="cart-text"><b className="project-details">Name :</b> {this.state.name}</p>
             <p class="cart-text"><b className="project-details">Project :</b>{this.state.project_title} </p>
           </div>
           <div class="col-sm-5">
              <p class="cart-text"><b className="project-details">Department :</b>{this.state.department}</p>
              <p class="cart-text"><b className="project-details">Email :</b> {this.state.email}</p>
              <p class="cart-text"><b className="project-details">Mobile no :</b>{this.state.phone}</p>
            </div>
        </div>
        </div>
      </div>

         <div class="card" id="statement_container" style={{'margin': '3rem 0'}}>
         <section class="project-info-header">Statement Of Purpose</section>
             <div class="card-body">
              <p class="card-text"> {this.state.statment_of_purpose}</p>
            </div>
         </div>

        {localStorage.getItem('role')==="professor"? 
        <div>       
         <div class="container my-2">
           {this.state.status === APPLICATION_SELECTED
            ? <div class="alert alert-success">You have selected this student !</div>
            :  <div class="alert alert-info">You have not selected this student yet </div>
            }
         </div>
         <div>
            <div class="row">
             <div class="col-sm-2">
              <a href={this.state.resume} target="blank" class="btn btn-dark">View Resume</a>
             </div>
             <div class="col-sm-8">
              {null}
             </div>

            
              
                {this.state.status === APPLICATION_NOT_SELECTED
                 ? <button class="btn btn-success" data-toggle="modal" data-target="#myselectModal" >Select</button>
                 :null
                }
          
          
            <div></div>
          </div>
         </div>
         </div>
         : 
         <div>
         <a href={this.state.resume} target="blank" style={{marginTop: '10px!important'}} className="stupo-btn">View Resume</a>
        </div>}
       </div>
      </div>
    )

  }

}

export default ApplicantDetails;
