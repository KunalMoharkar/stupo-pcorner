import React from 'react';
import {Link} from  'react-router-dom';
import Navigationbar from './Navigationbar';
import {Redirect} from 'react-router-dom';
import {PROJECT_ROUTE} from '../Api.js'

export default class Deleteproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_deleted:true,
    }
  }

  componentDidMount(){

    fetch(`${PROJECT_ROUTE}${this.props.match.params.project_id}/`, {
        method: 'DELETE',
        headers: {
          Authorization:`${localStorage.getItem('token')}`
        },
      })
  }

  render()
  {

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

            if(this.state.is_deleted)
            {
                  return(<div class="alert alert-success">Deletion Successful</div>)
            }
            else{
                    return(<div class="alert alert-danger">Deletion Unsuccessful</div>)
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
