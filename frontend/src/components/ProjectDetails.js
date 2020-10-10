import React from 'react'
import Header from './Header'
import Navigationbar from './Navigationbar'
import img_project from '../images/img_project.png'
import {Redirect} from 'react-router-dom';
import {PROJECT_ROUTE} from '../Api.js'


class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded:false,
      posted_by:"",
      title:"",
      tech_used:"",
      department:"",
      criterion:"",
      description:"",
      email:""
    }

}

  componentDidMount(){
    this.fetchdata()
  }

  fetchdata(){

    let url2 = `${PROJECT_ROUTE}${this.props.match.params.project_id}/`
    fetch(url2, {headers: {
           Authorization: `${localStorage.getItem('token')}`
       }})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            posted_by:result.professor.user.firstname,
            title:result.title,
            tech_used:"a",
            department:result.professor.user.deptid,
            criterion:result.criterion,
            description:result.description,
            email:result.professor.user.email,
          })
        },
      )
  }

  render(){

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
      <Header content="Project Details"/>
      <div class="container">
       <div class="card" id="applicant_container" style={{'margin': '3rem 0'}}>
       <section class="project-info-header">{this.state.title}</section>
        <div class="card-body">
        <div class="row">

          <div class="col-sm-2">
            <img src={img_project} alt="Avatar" id="applicant_img"/>
          </div>
          <div class="col-sm-5">
             <p class="cart-text"><b className="project-details">Tech used :</b> {this.state.tech_used}</p>
             <p class="cart-text"><b className="project-details">Criterion :</b>{this.state.criterion} </p>
          </div>
          <div class="col-sm-5">
              <p class="cart-text"><b className="project-details">Posted by :</b>{this.state.posted_by}</p>
              <p class="cart-text"><b className="project-details">Department :</b> {this.state.department}</p>
              <p class="cart-text"><b className="project-details">Email :</b>{this.state.email}</p>
          </div>
        </div>
        </div>
      </div>

         <div class="card" id="statement_container" style={{'margin': '3rem 0'}}>
             <section class="project-info-header">Description</section>
             <div class="card-body">
              <p class="card-text"> {this.state.description}</p>
            </div>
         </div>
       </div>
      </div>
    )

  }


}

export default ProjectDetails
