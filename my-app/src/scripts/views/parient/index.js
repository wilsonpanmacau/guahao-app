import "./index.scss";
import { Head } from "~/components/head"
import {Button,WhiteSpace,List, InputItem, } from "antd-mobile"

export default class Parient extends Component{
    goAddPar(){
        this.props.history.push("/app/addPar")
    }
    render(){
        return(
            <div>
                <Head title="就诊人管理" show={true}></Head>
                <Button style={{marginTop:100,width:"80%",marginLeft:"10%"}} onClick={()=>{this.goAddPar()}} type="primary">添加就诊人</Button><WhiteSpace />
            </div>
        )
    }
}