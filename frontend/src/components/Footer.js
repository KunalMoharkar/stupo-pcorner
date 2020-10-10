import React from 'react'
import '../css/Footer.css'
import '../css/homepage.css'
class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      content:"copyright@studentsportal",
      email:"studentsportalvnit@gmail.com",
    }

  }

  render(){

    return(
      <footer class="footer">
  <div class="container">
      <div class="row inner">

          <div class="col-xs-12 col-sm-4 col-md-3">
              <a href="http://studentportal.vnit.ac.in">
                  <img class="logo" style={{borderRadius: '4px'}} src="" alt="logo" width="140" />
              </a>
              <p>A platform that provides insight into the college life at VNIT.</p>
          </div>
          <div class="col-md-1"></div>
          <div class="col-xs-12 col-sm-4 col-md-4">
              <h3 class="g-color--white-opacity">Contact Us</h3>
              <p class="g-color--white-opacity-light">Visvesvaraya National Institute of Technology, South Ambazari Rd, Ambazari, Nagpur, Maharashtra 440010</p>
          </div>
          <div class="col-md-1"></div>
          <div class="col-sm-12 col-sm-4 col-md-3">
            <h3 class="g-color--white-opacity">Follow Us</h3>
              <div class="actions">
                  <a class="action-link" rel="noreferrer" href="https://www.instagram.com/studentportalvnit/" target="_blank">
                    <i class="g-padding-r-5--xs fa fa-instagram"></i>
                    <span class="g-display-none--xs g-display-inline-block--sm">Instagram</span>
                </a>
              </div>
              <div class="actions">
                  <a class="action-link" rel="noreferrer" href="https://www.linkedin.com/company/student-portal-vnit" target="_blank">
                    <i class="g-padding-r-5--xs fa fa-linkedin"></i>
                    <span class="g-display-none--xs g-display-inline-block--sm">LinkedIn</span>
                </a>
              </div>
              <div class="actions">
                  <a class="action-link" rel="noreferrer" href="mailto:studentportal@students.vnit.ac.in" target="_blank">
                    <i class="g-padding-r-5--xs fa fa-envelope"></i>
                    <span class="g-display-none--xs g-display-inline-block--sm">Mail</span>
                </a>
              </div>
          </div>
    </div>
  </div>
    <div class="copyright">
        <div class="" style={{position: 'relative', textAlign: 'center'}}>
            <p>© 2016-20 Copyright | Made with <i class="fa fa-heart"></i> by team Student Portal, VNIT</p>
        </div>
    </div>

</footer>
    )

  }

}


export default Footer
