

import "./index.scss";

import {Route,Switch,Redirect} from "react-router-dom"
import  Home  from "../home";
import  hotClassify  from "../hotClassify";

import {My}  from "../my";
import News from "../news";
import Parient from "../parient";
import AddPar from "../addPar";
import HospitalList from "../hospitalList";
import Appointment from "../appointment";


export class App extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/app/home" component={Home}></Route>
                    <Route path="/app/appointment" component={Appointment}></Route>
                    <Route path="/app/hotClassify" component={hotClassify}></Route>
                    <Route path="/app/news" component={News}></Route>
                    <Route path="/app/my" component={My}></Route>
                    <Route path="/app/parient" component={Parient}></Route>
                    <Route path="/app/addPar" component={AddPar}></Route>
                    <Route path="/app/hospitalList" component={HospitalList}></Route>
                    <Route 
                        render={
                            ()=>(<Redirect to="/app/home" />   )
                        }
                    />
                </Switch>
                
            </div>
        )
    }
}