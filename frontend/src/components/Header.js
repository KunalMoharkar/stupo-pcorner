import React from 'react';
import '../css/Header.css';

class Header extends React.Component{
  render(){
    return(
    <section class="cover-image">
        {this.props.content}
    </section>
    )
  }
}


export default Header;
