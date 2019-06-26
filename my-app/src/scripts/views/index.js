

import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import { Guide } from "./guide";
import { App } from "./app";
import PropTypes from "prop-types";
import { Search } from "./search";
import { Login } from "./login";
export class IndexView extends Component{
    render(){
        return (
            <Router>
                <div id="main">
                    <Route path="" exact component={Layout}  />
                </div>
            </Router>
        )
    }
}

// context

// 路由配置  
export class Layout extends Component{

    getChildContext(){
        
        return {
            props:this.props
        }
    }

    render(){
        return (
            <Switch>
                <Route path="/"  exact render={()=>(<Redirect to="/guide"  />)} />
                <Route path="/guide" component={Guide} />
                <Route path="/app/" strtic component={App}/>
                <Route path="/search" component={Search}/>
                <Route path="/login" component={Login}/>
                <Route 
                    render={
                        ()=>(<Redirect to="/app/" />   )
                    }
                />
            </Switch>
        )
    }
}

Layout.childContextTypes = {
    props:PropTypes.object
}
