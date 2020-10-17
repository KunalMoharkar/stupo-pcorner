import React from 'react'
import '../css/Loginform.css';
import {Redirect} from 'react-router-dom'
import Navigationbar from './Navigationbar'
import {AUTHORIZATION_ROUTES,USERS_ROUTES} from '../Api.js'

class Loginform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id :'',
      username: '',
      password: '',
      isLoaded:"a",
      islogged: false,
      is_student: false,
      token:'',
      error:'',
      items:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imt1bmFsIiwicGFzc3dvcmQiOiIyMjI0MSJ9.Z11xYNZXUbafdJqxZpqnzai9iLnUxIQT3aILGnZ9geU")
    //localStorage.setItem('user_id',"22241")
    //localStorage.setItem('username',"kunal")
    //localStorage.setItem('role_id',"4")
    localStorage.setItem('user_id',"15585")
    localStorage.setItem('username',"Sailesh")
    localStorage.setItem('role_id',"3")

    if(localStorage.getItem('role_id')=="3")
    {
      localStorage.setItem('role',"student")
    }
    else
    {
      localStorage.setItem('role',"professor")
    }

    if(this.props.location.state){
      this.setState({
        error : this.props.location.state.error
      })
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    fetch(`${AUTHORIZATION_ROUTES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify( {
                username :this.state.username,
                password :this.state.password,

          })
  })
    .then(res => res.json())
    .then(json => {
      this.setState({
        token:json.token,
      });

      if(this.state.token)
      {
        localStorage.setItem('token',this.state.token)
        localStorage.setItem('username',this.state.username)

        let url2 =`${USERS_ROUTES}?username=${this.state.username}`
        fetch(url2, {headers: {
               Authorization: `JWT ${localStorage.getItem('token')}`
           }})
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: "b",
                items: result[0],
                islogged:true,
                is_student: result[0].is_student,
                user_id:result[0].id
              })

              localStorage.setItem('user_id',this.state.user_id)

              if(this.state.is_student)
              {
                localStorage.setItem('role',"student")
              }
              else
              {
                localStorage.setItem('role',"professor")
              }


            }
          )


      }
      else {
        this.setState({
          error:"Invalid Credentials",
        });
      }

    });

    event.preventDefault();
  }

  render() {

    const error_alert =()=>{

        if(this.state.error)
        {
              return(<div class="alert alert-danger">{this.state.error}</div>)
        }
        else{
                return(<div></div>)
        }

    }

    if(this.state.islogged)
      {
        if(this.state.is_student)
        {
          return(<Redirect to={{
                  pathname: '/DashboardStudent/',
                  state: { user_id : this.state.user_id

                        }
              }}
          />)
        }
        else {
            return(<Redirect to={{
                    pathname: '/DashboardProfessor/',
                    state: { username: this.state.username,
                             password: this.state.password,
                             token : this.state.token,
                          }
                }}
            />)
          }
      }


    return (
      <div>
        <Navigationbar />
        <div class="container">
          <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
              <div class="form-container">
                <div class="form-header">
                  <h4>Enter Your Credentials</h4>
                </div>
                  <form onSubmit={this.handleSubmit}>
                      Name:
                      <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />
                      Password:
                      <input type="password" name="password" value={this.state.value} onChange={this.handleChange} />
                      <br/>
                    <button class="btn btn-primary" type="submit" value="Submit" >Login</button>
                  </form>
                  <br/>
                  <div>{error_alert()}</div>
              </div>
            </div>
            <div class="col-sm-2"></div>
            </div>
        </div>
      </div>
    );
  }

}

export default Loginform
