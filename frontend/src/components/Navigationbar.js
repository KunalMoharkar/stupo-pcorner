import React from 'react'
import {Link} from "react-router-dom";

class Navbrand extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      brandname:"STUPO",
    }
  }

  render()
  {
    return(
        <a class="navbar-brand" href="#">{this.state.brandname}</a>
    )
  }
}

class CollapseButton extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      toggler:"navbar-toggler-icon",
    }
  }

  render(){

    return(
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span><i class="fa fa-align-justify fa-custom"></i></span>
      </button>
    )

  }
}

class Navlinks extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    const homeLink = ()=>{
      if(!localStorage.getItem('token'))
      {
        return(
            <li class="nav-item"><Link to={"/"} class="nav-link">Home</Link></li>
        )
      }
      else
      {
        if(localStorage.getItem('role_id') === "3")
        {
          return(
              <li class="nav-item"><Link to={"/DashboardStudent/"} class="nav-link">Dashboard</Link></li>
          )
        }
        else {
          return(
              <li class="nav-item"><Link to={"/DashboardProfessor/"} class="nav-link">Dashboard</Link></li>
          )
        }
      }
    }

      const usersessions =()=>{

              if(localStorage.getItem('token'))
              {
                return(
                  <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <Link class="btn btn-dark">{localStorage.getItem('username')}</Link>
                        <Link to={"/Logout/"}class="btn btn-primary">Logout</Link>
                      </li>
                    </ul>
                  </div>
                )
              }
              else {
                return
              }

      }


      return(
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              {homeLink()}
              <li class="nav-item"><Link to={"/"} class="nav-link">About</Link></li>
              <li class="nav-item"><Link to={"/"} class="nav-link">Login</Link></li>
            </ul>
            {usersessions()}
        </div>

      )
  }


}

class Navigationbar extends React.Component {

  render(){
    return(
        <nav className="navbar navbar-default navbar-expand-lg fixed-top">
    <div className="navbar-header">
    <button className="navbar-toggle" id="button-mobile" style={{'float': 'left'}} type="button">
    <i className="material-icons" id="menu" style={{fontSize: '30px'}}>menu</i>
    <i className="material-icons" id="close" style={{fontSize: '30px', display: 'none'}}>close</i>
    </button>
    </div>
    <div className="collapse navbar-collapse" id="navbar-mobile">
    <ul className="nav navbar-nav mx-auto" style={{margin: '0 !important'}}>
    <li><a href="https://studentportal.vnit.ac.in/home">Home <span className="sr-only">(current)</span></a></li>
    <li><a href="https://studentportal.vnit.ac.in/home/aboutus">About</a></li>
    <li><a href="https://studentportal.vnit.ac.in/experiences">Experiences</a></li>
    <li><a href="https://studentportal.vnit.ac.in/clubs/">Clubs</a></li>
    { localStorage.getItem('role')==='student'
    ? <li><a href="/DashboardStudent/">Project Corner</a></li>
    : <li><a href="/DashboardProfessor/">Project Corner</a></li>
    }
    <li><a href="https://studentportal.vnit.ac.in/testimonials">Testimonials</a></li>
    <li class="dropdown login">
                    <a href class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">Hey! {localStorage.getItem('username')}
                       <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="/dashboard/{{ clg_id | urlencrypt }}/"><i class="material-icons">dashboard</i>Dashboard</a>
                        </li>
                        <li><a href="/home/contribute"><i
                                class="material-icons">post_add</i>Add Experience</a></li>
                        <li><a href="/home/add_testimonial"><i
                                class="material-icons">feedback</i>Add Testimonial</a></li>
                        <li><a href="/logout"><i class="material-icons">launch</i>Logout</a>
                        </li>
                    </ul>
    </li>
    </ul>
    </div>
    </nav>
    )
  }
}

export default Navigationbar
