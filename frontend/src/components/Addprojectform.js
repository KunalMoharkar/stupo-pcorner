import React from 'react'
import '../css/Addprojectform.css'
import Navigationbar from './Navigationbar'
import {Redirect} from 'react-router-dom';
import {PROJECT_ROUTE,TECHS_ROUTE,PROJECT_OPEN} from '../Api.js'


class Addprojectform extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      title: "",
      description: "",
      criterion: "",
      added:false,
      is_open:true,
	    all_techs : [],
      selected_techs : [],
      selected_tech_names : [],
	    techs_send : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTechSelect = this.handleTechSelect.bind(this);
    }

    componentDidMount(){
        fetch(`${TECHS_ROUTE}` , {
          method: 'GET',
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        })
        .then(data => data.json())
        .then(data => (
          this.setState({
            all_techs : data
          })
        ))
	 }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleTechSelect(event){

      let index = event.target.selectedIndex;
      let label = event.target[index].text;

        if(!this.state.selected_techs.includes(event.target.value))
       {
        this.setState({
          selected_techs:[...this.state.selected_techs,event.target.value],
          selected_tech_names:[...this.state.selected_tech_names,label],
        })
      }
    }

   handleTechRemove=(event)=>{

      let id = this.state.selected_techs[this.state.selected_tech_names.indexOf(event.target.value)] 
      this.setState({
        selected_techs:this.state.selected_techs.filter((tech_id)=>{return(id!=tech_id)}),
        selected_tech_names:this.state.selected_tech_names.filter((name)=>{return(name!=event.target.value)})
      })
   }

    handleSubmit(event) {
	      event.preventDefault();
	      this.setState({techs_send : this.state.selected_techs.join()})
        this.setState({value:''})
        fetch(`${PROJECT_ROUTE}`, { 
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify( {
                "professor_id": localStorage.getItem('user_id'),
                "project_status_id" : PROJECT_OPEN,
                "title": this.state.title,
                "description":this.state.description,
                "criterion": this.state.criterion,
                "tech_used_id": this.state.selected_techs,
            }),
       })
       .then(()=>{
         this.setState({
            added:true
         })
       })
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
      else{

          if(localStorage.getItem('role') === "student")
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

          if(this.state.added)
          {
            return(
              <Redirect
                to={{
                  pathname : '/ContentsProfessor',
                }}
                />
              )
          }
          else if(this.state.error)
          {
            return(<div class="alert alert-danger">{this.state.error}</div>)
          }

      }



      return (
        <div>
        <Navigationbar />
        <div class="container p-3">
        <div class="form-container">
            <div class="form-header">
              <h4>Enter Project Details</h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              Title:
              <input type="text" name="title" value={this.state.value} onChange={this.handleChange} required/>
              Description:
              <input type="text" name="description" value={this.state.value} onChange={this.handleChange} required/>
              Tech Used:
            
              <select id="techs" className="form-control" onChange={this.handleTechSelect}>
                <option value="none" selected disabled hidden>
                    Select a Tech
                </option>
                {
                  this.state.all_techs.map((tech)=>{
                    return(
                    <option value={tech.id} name={tech.name}>{tech.name}</option>
                    )
                  })
                }
              </select>
              <br/>
              <div className="tech-tags-container">
              { 
                 this.state.selected_tech_names.map((tech)=>{
                   return(
                   <div className="tech-tag">
                    {tech}
                    <button type="button" class="fa fa-times fa-custom-times " value={tech} onClick={this.handleTechRemove}>
                    </button>
                   </div>
                   )
                 })
               }
              </div> 
              Criterion:
              <input type="text" name="criterion" value={this.state.value} onChange={this.handleChange} required />

              <br/>
              <input class="btn btn-primary" type="submit" value="Add"/>
            </form>
        </div>
          <br />
          <div>{message_alert()}</div>
          </div>

        </div>


            )


      }

}


export default Addprojectform
