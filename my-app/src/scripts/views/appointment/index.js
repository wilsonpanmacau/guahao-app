import React, { Component } from "react"
import "./index.scss"
import { Head } from "~/components/head"
import { Accordion, List } from 'antd-mobile';
import PropTypes from "prop-types"
import axios from "@/utils/axios"
export default class Appointment extends Component {
    state = {
        types: []
    }
    componentWillMount() {
        axios.get("/react/getIllTypes", {}).then(res => {
            this.setState({
                types: res.data.result

            })
            console.log(this.state.types);
        })

    }
    //跳转到科室所对应的医院
    goHospitalList(type){
        const {history} = this.context.props;
        history.push(`/app/hospitalList?type=${type}`);
    }
    render() {
        return (
            <div>
                <Head title="预约挂号" show={true}></Head>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion  className="my-accordion">
                        {
                            this.state.types.map((type, i) => (
                                <Accordion.Panel key={i} header={type.type}>
                                    <List className="my-list">
                                        {
                                            type.littleType.map((lt, j) => (

                                                <List.Item onClick={()=>{this.goHospitalList(lt)}} key={j}>{lt}</List.Item>

                                            ))
                                        }
                                    </List>
                                </Accordion.Panel>

                            ))
                        }
                    </Accordion>
                </div>
            </div>
        )
    }
}

Appointment.contextTypes ={
    props:PropTypes.object
}


