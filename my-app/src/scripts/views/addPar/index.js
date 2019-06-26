import "./index.scss";
import { Head } from "~/components/head"
import { Button, WhiteSpace, List, InputItem, Toast} from "antd-mobile"

export const  mobileReg = /^1(3|5|7|8|9)\d{9}$/
export const  idcarReg = /^\d{18}$/

export default class AddPar extends Component {
    state={
        toggle:true,
    }
    addToMyPar(){
        var name = this.refs.name.state.value;
        var idcar = this.refs.idcar.state.value;
        var tel = this.refs.tel.state.value;
        if(idcarReg.test(idcar)&&mobileReg.test(tel)){
            
        }else{
            Toast.fail('手机或身份证号不正确,请重新输入', 1);
        }
    }
    render() {

        return (
            <div>
                <Head title="添加就诊人" show={true}></Head>
                <List style={{marginTop:30}}>
                    <InputItem
                        ref="name"
                        placeholder="请输入姓名"
                    >姓名</InputItem>
                    <InputItem
                        ref="idcar"
                        placeholder="请输入身份证号"
                    >身份证</InputItem>
                    <InputItem
                        ref="tel"
                        placeholder="请输入手机号"
                    >手机号</InputItem>
                </List>
                <Button style={{marginTop:100,width:"80%",marginLeft:"10%"}}  type="primary" onClick={()=>{this.addToMyPar()}}  >确定</Button><WhiteSpace />
            </div>
        )
    }
}