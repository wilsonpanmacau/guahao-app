

import "./index.scss";
import { Head } from "~/components/head"
import { Button, List } from "antd-mobile"
import userInfo from "~/mobx/userInfo"
import { observer } from "mobx-react";
// observer  订阅  当被观察者observable 改变 重新刷新 组件 

const Item = List.Item;
const Brief = Item.Brief;
@observer
export class My extends Component {

    goOut = () => {
        const { history } = this.props;
        userInfo.changeIsLogin();
        history.push("/home");

    }
    goToLogin = ()=>{
        const { history } = this.props;
        history.push("/login");
    }
   
    goPatient() {
        this.props.history.push("/app/parient")
    }
    gotoMyOrder(){
        this.props.history.push("/app/myorder");
    }
    gotoMyCollct() {
        this.props.history.push("/app/mycollect");
    }
    render() {
        const {
            isLogin,
        } = userInfo;
        return (
            <div>
                <Head title="个人中心" show={true}></Head>
                <div style={{ display: isLogin ? 'block' : 'none' }}>
                    <List className="my-list">
                        <Item arrow="horizontal" multipleLine onClick={() => {this.gotoMyOrder()}}>
                            我的预约
                    </Item>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => { this.goPatient() }}
                            platform="android"
                        >
                            就诊人管理
                    </Item>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => { this.gotoMyCollct() }}
                        >
                            我的收藏
                    </Item>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => { }}
                        >
                            意见反馈
                    </Item>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => { }}
                        >
                            邀请好友
                    </Item>
                    </List>
                    <Button onClick={this.goOut} style={{ marginTop: 80, marginLeft: 20, marginRight: 20, height: 40, fontSize: 16, lineHeight: "40px",borderRadius:20 }}>退出登录</Button>
                </div>
                <div  style={{display:!isLogin?'block':'none'}}>
                <Button onClick={this.goToLogin} style={{ marginTop: 80, marginLeft: 20, marginRight: 20, height: 40, fontSize: 16, lineHeight: "40px",borderRadius:20,backgroundColor:"#4099fb",color:"#fff" }}>立即登录</Button>
                </div>
            </div>
        )
    }
}