import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import {Link , Redirect} from 'react-router-dom'
import Navigationbar from './Navigationbar'
import {PROJECT_ROUTE,PROJECT_OPEN,PROJECT_CLOSED} from '../Api.js'
import {ModalOpenProject,ModalDeleteProject} from './Modal'


class ContentsProfessor extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : false,
      error: false,
      items :[],
    }

  }

  /*
  called on modal click open/close and delete
  default arg status
  */  
  handleModalClick=(project_id,status = PROJECT_OPEN)=>{
    localStorage.setItem('status',status);
    localStorage.setItem('project_id',project_id);
  }

  
  ChangeProjectStatus=()=>{
      
      const project_id = localStorage.getItem('project_id');
      const status = localStorage.getItem('status');

      fetch(`${PROJECT_ROUTE}${project_id}/`, {
        method: 'PUT',
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify( {
                "professor_id":`${localStorage.getItem('user_id')}`,
                "project_status_id":status,
              }),
      })
        .then(()=>{
          /*force page reload*/
          window.location.reload(false)
        })
        .catch(()=>{
          console.log("error");
        })
  
  }  

  DeleteProject=()=>{

      const project_id = localStorage.getItem('project_id');
      
      fetch(`${PROJECT_ROUTE}${project_id}/`, {
        method: 'DELETE',
        headers: {
          Authorization:`${localStorage.getItem('token')}`
        },
      })
      .then(()=>{
        window.location.reload(false)
      })
      .catch(()=>{
          console.log("error")
        })
    
  }

  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){

     var that = this
     let url2 =`${PROJECT_ROUTE}?professor_id=${localStorage.getItem('user_id')}`
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

     {/*Authorzation checks*/}
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
        {/*Role based Auth*/}
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

     const isLoaded = this.state.isLoaded;

     return(
       <div>
        <Navigationbar />
        <ModalOpenProject handler={this.ChangeProjectStatus}/>
        <ModalDeleteProject handler={this.DeleteProject}/>
        <Header content="Your Projects" />
        <div class="container">
          {isLoaded?null:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}
          {this.state.items.map(item =>(
              <table className="table table-hover">
            <tbody>
              <tr>
                <td id="linkdata">
                  <article id className="post-137294 post type-post status-publish format-standard hentry category-interview-experiences tag-amazon">
                    <header className="entry-header">
                    <Link to={`/ProjectDetails/${item.id}`} >
                      <h2 className="entry-title">
                        {item.title}
                        &nbsp;
                      </h2>
                      </Link>
                    </header>
                    {/* entry-header */}
                    <div className="entry-summary">
                      {/* Ico nic One home page thumbnail with custom excerpt */}
                      <div className="excerpt-thumb">
                      </div>
                      <p>Technologies used:</p>
                      <p>Criteria:{item.criterion}</p>
                    </div>
                    <div>
                    <Link to={`/ContentsApplicants/${item.id}`}>
                    <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">See Applicants</button>
                    </Link>
                    {item.project_status.id===PROJECT_OPEN?
                    <button type="button" data-toggle="modal" data-target="#Mymodal" onClick={()=>{this.handleModalClick(item.id,PROJECT_CLOSED)}} id style={{marginTop: '10px!important'}} className="stupo-btn">Close</button>
                    :
                    <button type="button" data-toggle="modal" data-target="#Mymodal" onClick={()=>{this.handleModalClick(item.id,PROJECT_OPEN)}} id style={{marginTop: '10px!important'}} className="stupo-btn">Open</button>
                    }
                      <button type="button" class="float-right" data-toggle="modal" data-target="#myModal" onClick={()=>{this.handleModalClick(item.id)}} id style={{marginTop: '10px!important'}} className="stupo-btn">Delete</button>
                    </div>
                  </article>{/* #post */}
                </td>
              </tr>
            </tbody>
          </table>
          ))}
      </div>
     </div>
     )
   }

}


export default ContentsProfessor
