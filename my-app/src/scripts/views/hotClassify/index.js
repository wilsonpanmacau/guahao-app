import React, { Component } from "react"
import "./index.scss"
import  {Head} from "~/components/head"
import axios from "axios";
import { WingBlank, WhiteSpace,Grid } from 'antd-mobile';
import  store  from "~/store";
import history from "@/utils/history";
import { getCatname,getDetail } from "~/actions";
import {connect} from "react-redux";

@connect(
    state=>{
        return {
            ...state.data
        }
    }
)
export default class hotClassify extends Component{

    state = {
        data: []
    }

    componentWillMount() {
        axios.post("/react/getClassify").then( res => {
            console.log(res.data);
            this.setState({
                data: res.data.result
            })
            console.log(this.state.data);
        })

    }

    gotoDatails=(name)=>{
        
        console.log(this.props)
        const{
            dispatch
        } = this.props
        dispatch(getCatname(name));
        dispatch(getDetail({
            url: "/react/getClassifyDetail",
            params: {
                catname:name
            },
            cb: (res) => {
                console.log(res);
            }
        }))
        history.push("/app/details")
        
    }

    render(){
        const{
            data
        } = this.state
       
        return(
            <div>
                <Head title="热门科室" show={true}></Head>
                <Grid data={data}
                    columnNum={4}
                    renderItem={dataItem => (
                        <div style={{textAlign:'center' }} onClick={()=>this.gotoDatails(dataItem.name)}>
                            <img src={dataItem.img} style={{ width: '50px', height: '50px' , padding: '20px 0 0 24px'}} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '5px', }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
}