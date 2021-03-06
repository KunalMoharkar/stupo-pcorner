import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import img_avatar from '../images/img_avatar.png'
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
      id:"",
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
        .then(res => {
          if(!res.ok)
          {
            throw res
          }
          return res.json()
        })
        .then((res)=>{
          
          /*force page reload*/
         window.location.reload(false)
        })
        .catch(()=>{
          this.setState({error:true})
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
      .then(res => {
        console.log(res.status)
        if(!(res.status === 204))
        {
          throw res
        }
      })
      .then(()=>{
        window.location.reload(false)
      })
      .catch(()=>{
        this.setState({error:true})
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
       ).catch(()=>{
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

     {/*Authorzation checks*/}
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
        {/*Role based Auth*/}
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
                <td id="linkdata" style={{'width':'80%'}}>
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
                      <div className="techs-container">
                    <ul class="tags-tech">
                    {item.tech_used.map((tech)=>{
                      return(
                             <li><div class="tag-tech" style={{'text-decoration': 'none',}}>{tech.name}</div></li>
                             )
                    })}
                    </ul>
                  </div>
                      <span class="entry-title" style={{'font-size': '2.2rem'}}><br/>[Criteria]<span style={{'color':'#555','font-size':'75%'}}>{item.criterion}</span></span>
                    </div>
                    <div>
                    <Link to={`/ContentsApplicants/${item.id}`}>
                    <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">See Applicants</button>
                    </Link>
                    {item.project_status.id===PROJECT_OPEN?
                    <button type="button" data-toggle="modal" data-target="#Mymodal" onClick={()=>{this.handleModalClick(item.id,PROJECT_CLOSED)}} id style={{marginTop: '10px!important'}} className="stupo-btn">Close</button>
                    :
                    <button type="button" data-toggle="modal" data-target="#Mymodal" onClick={()=>{this.handleModalClick(item.id,PROJECT_OPEN)}} id style={{marginTop: '10px!important'}} className="stupo-btn-dark">Open</button>
                    }
                      <button type="button" class="float-right" data-toggle="modal" data-target="#myModal" onClick={()=>{this.handleModalClick(item.id)}} id style={{marginTop: '10px!important'}} className="stupo-btn">Delete</button>
                    </div>
                  </article>{/* #post */}
                </td>
                <td>
            <div><img src={img_avatar} alt="Avatar" id="applicant_img"/></div>
            <div class="text-center" style={{"margin-top":"1rem"}}>Under Prof. {item.professor.user.firstname} {item.professor.user.lastname}</div>
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
