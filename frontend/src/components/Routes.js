import React, { Component} from "react";
import { Switch, Route} from "react-router-dom";
import Contents from './Contents';
import Header from './Header';
import Footer from './Footer';
import Loginform from './Loginform'
import ContentsProfessor from './ContentsProfessor'
import ContentsApplicants from './ContentsApplicants'
import Applicationform from './Applicationform'
import Addprojectform from './Addprojectform'
import Logout from './Logout'
import Closeproject from './Closeproject'
import Deleteproject from './Deleteproject'
import AppliedProjects from './AppliedProjects'
import DashboardProfessor from './DashboardProfessor'
import DashboardStudent from './DashboardStudent'
import ApplicantDetails from './ApplicantDetails'
import ProjectDetails from './ProjectDetails'
import {Error404,Error500,Error403} from './Error'

class Routes extends Component {
    render() {
        return (
            <div className="site">

                    <Switch>
                        <Route exact path={"/"} render={(props)=><Loginform {...props}/>}/>
                        <Route exact path={"/Contents/"} render={(props)=><Contents {...props}/>}/>
                        <Route exact path={"/Header/"} component={Header}/>
                        <Route exact path={"/Footer/"} component={Footer}/>
                        <Route exact path={"/ContentsProfessor/"} component={ContentsProfessor}/>
                        <Route exact path={"/ContentsApplicants/:project_id"} name="ContentsApplicants" component={ContentsApplicants}/>
                        <Route exact path={"/Applicationform/:project_id"} component={Applicationform}/>
                        <Route exact path={"/Closeproject/:project_id/:status"} component={Closeproject}/>
                        <Route exact path={"/Deleteproject/:project_id"} component={Deleteproject}/>
                        <Route exact path={"/Addprojectform/"}  component={Addprojectform}/>
                        <Route exact path={"/Logout/"} component={Logout}/>
                        <Route exact path={"/applied_projects/"} render={(props)=><AppliedProjects {...props}/>}/>
                        <Route exact path={"/DashboardProfessor/"}  component={DashboardProfessor}/>
                        <Route exact path={"/DashboardStudent/"}  component={DashboardStudent}/>
                        <Route exact path={"/ApplicantDetails/:application_id"} component={ApplicantDetails}/>
                        <Route exact path={"/ProjectDetails/:project_id"} component={ProjectDetails}/>
                        <Route exact path={"/Error500/"} component={Error500}/>
                        <Route exact path={"/Error403/"} component={Error403}/>
                        {/*Default 404*/}
                        <Route exact path={"*"} component={Error404}/>
                    </Switch>
            </div>


        );
    }
}

export default Routes;
