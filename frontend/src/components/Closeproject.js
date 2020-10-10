import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Navigationbar from './Navigationbar';
import {PROJECT_ROUTE} from '../Api.js'

class Closeproject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done:false,
      status:"",
    }
  }

  componentDidMount(){

        fetch(`${PROJECT_ROUTE}${this.props.match.params.project_id}/`, {
        method: 'PUT',
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify( {
                "professor_id":`${localStorage.getItem('user_id')}`,
                "project_status_id":this.props.match.params.status,
              }),
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
              done:true,
              status:this.props.match.params.status,
          });
        }
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






      const error_alert =()=>{

          if(this.state.done)
          {
                if(this.props.match.params.status === "1")
                {
                  return(<div class="alert alert-success">Project is Now open</div>)
                }
                else
                {
                   return(<div class="alert alert-warning">Project is Now Closed</div>)
                }

          }
          else
          {
                return(<div class="alert alert-danger">couldn't proceed your request</div>)
          }

    }

    return(
      <div>
        <Navigationbar/>
        <div class="container my-3">
        <div>{error_alert()}</div>
        <Link to={"/ContentsProfessor/"} class="btn btn-dark">Back to Projects</Link>
        </div>
      </div>
    )

  }


}


export default Closeproject;
