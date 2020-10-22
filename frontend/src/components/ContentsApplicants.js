import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import Navigationbar from './Navigationbar'
import {Redirect,Link}  from 'react-router-dom';
import {APPLICATION_ROUTE} from '../Api.js'


class ContentsApplicants extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : false,
      items :[],
      status : 'all',
    }
     this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

  this.fetchdata(event.target.value);
  this.setState({
    status:event.target.value
  })

  }


  componentDidMount() {

      this.fetchdata(this.state.status)
  }

  fetchdata(status){

    this.setState({isLoaded:false})
    var that = this;
    let url2 = `${APPLICATION_ROUTE}?project_id=${this.props.match.params.project_id}&status=${status}`
    fetch(url2, {headers: {
           Authorization: `${localStorage.getItem('token')}`
       }})
      .then(res => res.json())
      .then(
        (result) => {
          setTimeout(function() {
            that.setState({
              isLoaded: true,
              items: result,
            })
          },1000);
        },
      )
  }


   render(){


         if( localStorage.getItem( 'token') === null){
            return (
              <Redirect
                to={{
                  pathname : '/Error403',
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
                   pathname : '/Error403',
                 }}
                 />
               )
             }

         }

     const isLoaded = this.state.isLoaded

    return(
        <div>
          <Navigationbar />
          <Header content="Applicants" />
         <div class="container">
          {isLoaded?
            <div>
           <table class="table">
           <thead class="thead-dark">
               <tr>
                 <th>Name</th>
                 <th class="mobile-hide">Enrollment Id</th>
                 <th class="mobile-hide">Department</th>
                 <th>Application Details</th>
                 <th>Status</th>
               </tr>
             </thead>
           <tbody>
         {this.state.items.map(item =>(

        <tr className="tr-hover">
          <td>{item.student.user.firstname}</td>
          <td class="mobile-hide">{item.student.user.roll_no}</td>
          <td class="mobile-hide">{item.student.user.deptid}</td>
          <td><Link to={`/ApplicantDetails/${item.id}`} class="stupo-btn" style={{'text-decoration': 'none'}}>View</Link></td>
          {
          item.application_status.id=='4'?(
          <td style={{"color":"red"}}>Not Selected</td>
          )
          :(
          <td style={{"color":"green"}}>Selected</td>
          )
          }
        </tr>
       ))}

             </tbody>
        </table>
        { this.state.items?null
            :<p>Oops!</p>
            }
        </div>
        :<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}
       </div>
     </div>
     )
   }

}


export default ContentsApplicants
