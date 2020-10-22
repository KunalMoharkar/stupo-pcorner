import React from 'react'
import '../css/Footer.css'
import '../css/homepage.css'
import icon_sm from '../images/icon_sm.png'
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
  <div className="inner">
  <div className="row company">
    <img alt="logo" className="logo" src={icon_sm} style={{borderRadius: '4px'}} width={60} />
    <p className="caption">Student Portal <br /> VNIT</p>
  </div>
  <div className="row"><div className="col-xs-12">
      <a className="social action-link" href="https://www.instagram.com/studentportalvnit/" rel="noreferrer" target="_blank">
        <i className="g-padding-r-5--xs fa fa-instagram" /> <span className="g-display-none--xs g-display-inline-block--sm">Instagram</span></a>
      <a className="social action-link" href="https://www.linkedin.com/company/student-portal-vnit" rel="noreferrer" target="_blank">
        <i className="g-padding-r-5--xs fa fa-linkedin" /> <span className="g-display-none--xs g-display-inline-block--sm">LinkedIn</span></a>
      <a className="social action-link" href="mailto:studentportal@students.vnit.ac.in" rel="noreferrer" target="_blank">
        <i className="g-padding-r-5--xs fa fa-envelope" /> <span className="g-display-none--xs g-display-inline-block--sm">Mail</span></a>
    </div>
  </div>
  <div className="row footer-body">
    <div className="col-xs-12 col-sm-4">
      <h3 className="g-color--white-opacity">Locate Us</h3>
      <p className="g-color--white-opacity-light">Visvesvaraya National Institute of Technology, South Ambazari Rd, Ambazari, Nagpur, Maharashtra 440010</p>
    </div>
    <div className="col-sm-12 col-sm-4">
      <h3 className="g-color--white-opacity">Platforms</h3>
      <div className="actions">
        <a className="action-link" href="https://www.instagram.com/studentportalvnit/" rel="noreferrer" target="_blank">
          <span className="g-display-none--xs g-display-inline-block--sm">Experiences</span></a>
      </div>
      <div className="actions">
        <a className="action-link" href="https://www.linkedin.com/company/student-portal-vnit" rel="noreferrer" target="_blank">
          <span className="g-display-none--xs g-display-inline-block--sm">Clubs</span></a>
      </div>
    </div>
    <div className="col-sm-12 col-sm-4">
      <h3 className="g-color--white-opacity">Quick Links</h3>
      <div className="actions">
        <a className="action-link" href="mailto:studentportal@students.vnit.ac.in" rel="noreferrer" target="_blank">
          <span className="g-display-none--xs g-display-inline-block--sm">About Us</span></a>
      </div>
      <div className="actions"><a className="action-link" href="mailto:studentportal@students.vnit.ac.in" rel="noreferrer" target="_blank">
          <span className="g-display-none--xs g-display-inline-block--sm">Testimonials</span></a>
      </div>
      <div className="actions">
        <a className="action-link" href="mailto:studentportal@students.vnit.ac.in" rel="noreferrer" target="_blank">
          <span className="g-display-none--xs g-display-inline-block--sm">Join Us</span></a>
      </div>
      <div className="actions" />
      <div className="actions" />
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
