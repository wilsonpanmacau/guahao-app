

import "./index.scss";

import {Route,Switch,Redirect} from "react-router-dom"
import  Home  from "../home";
import  hotClassify  from "../hotClassify";

import {My}  from "../my";
import News from "../news";
import Parient from "../parient";
import AddPar from "../addPar";

import Detail from "../details";
import NewDetail from "../newdetail";
import DocDetail from "../docdetail";
import HospitalList from "../hospitalList";
import Appointment from "../appointment";
import HosDetail from "../hosDetail"
import CodeDetail from "../codedetail";
import Patientinfo from "../patientinfo";
import MyOrder from "../myorder";
import MyCollct from "../mycollect";
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
                    <Route path="/app/details" component={Detail} ></Route>
                    <Route path="/app/docdetail" component={DocDetail} ></Route>
                    <Route path="/app/newdetail" component={NewDetail} ></Route>
                    <Route path="/app/hospitalList" component={HospitalList}></Route>
                    <Route path="/app/hosDetail" component={HosDetail}></Route>
                    <Route path="/app/codedetail" component={CodeDetail}></Route>
                    <Route path="/app/patientinfo" component={Patientinfo}></Route>
                    <Route path="/app/myorder" component={MyOrder}></Route>
                    <Route path="/app/mycollect" component={MyCollct}></Route>
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