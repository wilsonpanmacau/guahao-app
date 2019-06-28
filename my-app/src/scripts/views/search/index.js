

import "./index.scss"
import axios from 'axios';
import  {Head} from "~/components/head"
import {WingBlank,WhiteSpace,SearchBar,Toast} from  "antd-mobile"
import Item from "../../components/item";

export class Search extends Component{

    state={
        hospitals:[]
    }

    getSearch=()=>{
        console.log(this.refs.one.state.value);
        const keyword = this.refs.one.state.value
        if(keyword){
            axios.get("/react/getHospitals",{params:{keyword}}).then(res=>{
                console.log(res);
                this.setState({
                    hospitals :res.data.result
                })
            })
        }else{
            Toast.info('请输入关键字搜索', 1);
        }
    }

    render(){
        console.log(this.state.hospitals);
        return (
            <div>
                <Head title="搜索医院" show={true} ></Head>
                <WingBlank>
                    <WhiteSpace />
                    <SearchBar ref="one" placeholder="搜索医院" maxLength={10} onBlur={this.getSearch} />
                </WingBlank>
                {
                    this.state.hospitals.map((hos,i)=>{
                        return(
                            <Item key={i} data={hos}></Item>
                        )
                    })
                }
            </div>
        )
    }
}