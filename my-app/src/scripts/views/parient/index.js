import "./index.scss";
import { Head } from "~/components/head"
import { Button, WhiteSpace, List, InputItem, Modal,WingBlank,Toast} from "antd-mobile"
import axios from "axios";
import userInfo from "~/mobx/userInfo"
const alert = Modal.alert;
export default class Parient extends Component {
    state = {
        data: []
    }
    goAddPar() {
        this.props.history.push("/app/addPar")
    }
    getpar(){
        let usertel = userInfo.usertel;
        // let usertel = 17671616715
        axios.get("/react/getParient", { params: { usertel } }).then(res => {
            console.log(res);
            this.setState({
                data: res.data.result
            })
            // console.log(this.state.data)
        })
    }
    componentWillMount() {
        this.getpar();
    }
    delete=(_id)=>{
        alert('删除', '确定要删除这个就诊人吗', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () =>  this.deleteOne(_id)},
          ])
    }
    deleteOne=(_id)=>{
        axios.get("/react/deletePat",{params:{_id:_id}}).then(res=>{
            console.log(res);
            location.reload();
        })
        // console.log("delete");
    }
    render() {
        return (
            <div>
                <Head title="就诊人管理" show={true}></Head>
                {
                    
                        this.state.data&&this.state.data.map((item, i) => {
                            return (
                                <div className="parItem" key={i}>
                                    <p>{item.name}</p><i onClick={()=>{this.delete(item._id)}} className="iconfont icon-shanchu"></i>
                                    <p>手机号 {item.tel}</p>
                                    <p>身份证号 {item.idcard}</p>
                                </div>
                            )
                        })
                    
                    
                }
                <Button onClick={() => { this.goAddPar() }} style={{ marginTop: 80, marginLeft: 20, marginRight: 20, height: 40, fontSize: 16, lineHeight: "40px", borderRadius: 20, backgroundColor: "#4099fb", color: "#fff" }}>添加就诊人</Button>
            </div>
        )
    }
}