import React from 'react'
import {Redirect} from 'react-router'

class Logout extends React.Component {

  componentDidMount(){

    localStorage.clear('username')
    localStorage.clear('token')

  }

  render(){

    return(<Redirect to={{
            pathname: '/',
            state: {
                        islogged:false
                  }
        }}
    />)



  }



}



export default Logout
