

import "./index.scss"

import {NavBar,Icon} from "antd-mobile"
export class Head extends Component{
    goback=(show)=>{
        const {history} = this.context.props;
        if(show){
            history.go(-1);
        }
    }
    goSearch = ()=>{
        const {history} = this.context.props;
        history.push("/search");
    }
    render(){
        const  {
            title,
            show
        }  = this.props;
        return (
            <NavBar
                mode="light"
                icon={show&&<Icon type="left" color="#555" />}
                onLeftClick={() => this.goback(show)}
                rightContent={[
                  
                ]}
                > {title }</NavBar>
        )
    }
}

import PropTypes from "prop-types"
Head.contextTypes ={
    props:PropTypes.object
}
