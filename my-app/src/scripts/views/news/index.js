import React, { Component } from "react"
import "./index.scss"
import  {Head} from "~/components/head"
import axios from "axios";
import { Tabs, WhiteSpace, Badge,List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


export default class News extends Component{
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
    render(){
        const{
            data
       } = this.state
        return(
            <div>
                <Head title="健康快讯" show={true}></Head>
                <List className="my-list">
                    {
                        data.map((item,i)=>{
                            return (
                                <Item align="top" key={i} data_id={item.id} thumb={item.photo} multipleLine>
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