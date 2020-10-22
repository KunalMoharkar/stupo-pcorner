import React from 'react';
import PropTypes from 'prop-types';
import Navigationbar from './Navigationbar'
import img_avatar from '../images/img_avatar.png'
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Header from './Header';
import {APPLICATION_ROUTE,APPLICATION_SELECTED,APPLICATION_NOT_SELECTED} from '../Api.js'



class AppliedProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applied_list : [],
      isLoaded : false,
      user_id : ''
    }
  }

  componentDidMount() {
    let user_id = null;
    if(this.props.location.state != null){
      user_id = this.props.location.state.user_id;
    }else{
      user_id = localStorage.getItem('user_id');
    }

    var that = this
    let url = `${APPLICATION_ROUTE}?student_id=${user_id}`;
    fetch(url ,{headers: {
      Authorization: `${localStorage.getItem('token')}`
    }} )
    .then(res => res.json())
    .then(data => {

      setTimeout(function() {
        that.setState({
          isLoaded: true,
          applied_list: data,
        })
      },1000);


    }).catch(e=>{

    })
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

            if(localStorage.getItem('role') === "professor")
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


    return (
      <div>
       <Navigationbar />
       <Header content="Applications"/>
      <div className="container">



      {this.state.applied_list.map(item =>(
          <table className="table table-hover">
        <tbody>
          <tr>
            <td id="linkdata" style={{'width':'80%'}}>
              <article id className="post-137294 post type-post status-publish format-standard hentry category-interview-experiences tag-amazon">
                <header className="entry-header">
                <Link to={`/ApplicantDetails/${item.project.id}`} >
                  <h2 className="entry-title">
                    {item.project.title}
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
                    {item.project.tech_used.map((tech)=>{
                      return(
                             <li><div class="tag-tech" style={{'text-decoration': 'none',}}>{tech.name}</div></li>
                             )
                    })}
                    </ul>
                  </div>
                      <span class="entry-title" style={{'font-size': '2.2rem'}}><br/>[Criteria]<span style={{'color':'#555','font-size':'75%'}}>{item.criterion}</span></span>
                </div>
                <div>
                  <Link to={`/ProjectDetails/${item.project.id}`} class="float-right">
                  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">Details</button>
                  </Link>
                  <Link to={`/ApplicantDetails/${item.id}`}>
                  <button type="button" id style={{marginTop: '10px!important'}} className="stupo-btn">View Application</button>
                  </Link>
                </div>
              </article>{/* #post */}
            </td>
            <td>
            <div><img src={img_avatar} alt="Avatar" id="applicant_img"/></div>
            <div class="text-center" style={{"margin-top":"1rem"}}>Under Prof. Abhishek Jaiswal</div>
            </td>
          </tr>
        </tbody>
      </table>
      ))}

    {isLoaded?<Link to={"/Contents/"} className="text-center font-weight-bold">
    <button type="button" id style={{marginBottom: '3rem'}} className="stupo-btn-dark-nohover">Apply on more projects</button>
    </Link>:<div class="spin-container"><div class="spinner spinner-grow text-success"></div><h4>Loading...</h4></div>}

    </div>
    </div>
    )
  }

};
export default AppliedProjects;