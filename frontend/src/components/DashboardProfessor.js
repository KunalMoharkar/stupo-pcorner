import React from 'react';
import {Link} from 'react-router-dom';
import Navigationbar from './Navigationbar';
import Header from './Header';
import '../css/Dashboard.css';
import {Redirect} from 'react-router-dom';

class DashboardProfessor extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {

    };
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





    return(
      <div>
      <Navigationbar />
      <Header content="Projects Corner" />
        <div class="container">


        <div className="row" style={{ 'margin-top': '5rem'}}>
        <div className="col-sm-6">
          <div className="home-card">
            <h3>Posted Projects</h3>
            <p>Student Portal provides you the interview experiences of past students, the various companies that have come and the packages that they have offered and many more, that will definitely increase your chances at grabbing the best opportunities that you are presented with.</p>
            <Link to={"/ContentsProfessor/"}>
            <button className="stupo-btn-dark" onclick="location.href='/experiences'">Review</button>
            </Link>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="home-card">
            <h3>Add Project</h3>
            <p>Student Portal guarantees to bring all these clubs to you by presenting all of its events, important dates and announcements and keeping you up to date with the happenings in the college.</p>
            <Link to={"/Addprojectform/"}>
            <button className="stupo-btn-dark">Check Now</button>
            </Link>
            {/* <a href="/clubs"><div><img style={{width: '100%'}} src="{% static 'IMAGES/clubs.png' %}" alt="" /></div></a> */}
          </div>
        </div>
      </div>
      </div>
      </div>

    )

  }

}


export default DashboardProfessor;
