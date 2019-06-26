import React, { Component } from "react"
import "./index.scss"
import  {Head} from "~/components/head"
import axios from "axios";
import { WingBlank, WhiteSpace,Grid } from 'antd-mobile';



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
                        <div style={{textAlign:'center' }}>
                            <img src={dataItem.img} style={{ width: '50px', height: '50px' , padding: '14px 0 0 27px'}} alt="" />
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