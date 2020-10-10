import React from 'react'
import '../css/Navigationbar.css'
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
        if(localStorage.getItem('role') === "student")
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
        <nav class="navbar navbar-expand-md ">
          <Navbrand />
          <CollapseButton />
          <Navlinks/>

        </nav>
    )
  }
}

export default Navigationbar
