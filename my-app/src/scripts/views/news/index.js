import React, { Component } from "react"
import "./index.scss"
import { Head } from "~/components/head"
import axios from "axios";
import { Tabs, WhiteSpace, Badge, List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import { getNewDetail } from "~/actions";
import history from "@/utils/history";
import {connect} from "react-redux";

@connect(
    state=>({
            ...state.data
    })
)
export default class News extends Component {
    state = {
        types: [],
        data: []
    }

    componentWillMount() {
        axios.get("/react/getNews")
            .then(res => {
                console.log(res.data)
                this.setState({
                    data: res.data.result
                })
            })
    }

    gotoNewDetaiil = (newid) => {

        console.log(this.props)
        const {
            dispatch
        } = this.props

        // dispatch(getNewDetail(id));
        dispatch(getNewDetail({
            url: "/react/getNewDetail",
            params: {
                newid
            },
            cb: (res) => {
                console.log(res.data.result);
            }
        }))
        history.push("/app/newdetail")


    }

    render() {
        const {
            data
        } = this.state
        return (
            <div>
                <Head title="健康快讯" show={true}></Head>
                <List className="my-list">
                    {
                        data.map((item, i) => {
                            return (
                                <Item className="item" align="top" key={i} thumb={item.photo} onClick={() => this.gotoNewDetaiil(item.id)} multipleLine>
                                    {item.title}
                                    <Brief>{item.content}</Brief>
                                </Item>
                            )

                        })
                    }
                </List>
            </div>
        )
    }
}