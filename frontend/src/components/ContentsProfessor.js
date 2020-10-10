import React from 'react'
import '../css/Contents.css'
import Header from './Header'
import {Link , Redirect} from 'react-router-dom'
import Navigationbar from './Navigationbar'
import {PROJECT_ROUTE,PROJECT_OPEN,PROJECT_CLOSED} from '../Api.js'

class ContentsProfessor extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isLoaded : false,
      items :[],
    }

  }


  componentDidMount() {
    this.fetchdata()
  }

   fetchdata(){

     var that = this
     let url2 =`${PROJECT_ROUTE}?professor_id=${localStorage.getItem('user_id')}`
     fetch(url2, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`

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


     const isLoaded = this.state.isLoaded


     return(
       <div>
       <Navigationbar />
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
                {item.project_status.id===PROJECT_OPEN?<Link to={`/Closeproject/${item.id}/${PROJECT_CLOSED}`}>
                <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Close</button>
                </Link>:
                <Link to={`/Closeproject/${item.id}/${PROJECT_OPEN}`}>
                <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Open</button>
                </Link>}
                  <Link to={`/Deleteproject/${item.id}`} class="float-right">
                  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Delete</button>
                  </Link>
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
