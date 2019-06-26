

import "./index.scss";
import { Head } from "~/components/head"
import { Button,List} from "antd-mobile"
const Item = List.Item;
const Brief = Item.Brief;
export class My extends Component {
    state = {
        isLogin: true
    }

    goOut = () => {
        const { history } = this.props;
        history.push("/home");
    }

    componentWillMount() {
        const { history } = this.props;
       
        if (sessionStorage.usertel) {
            this.state.isLogin = true
           
        } else {
            history.push("/login");
        }
    }
    goPatient(){
        this.props.history.push("/app/parient")
    }
    render() {
        const {
            isLogin
        } = this.state;
        return (
            <div>
                <Head title="个人中心" show={true}></Head>
                <List renderHeader={() => 'Subtitle'} className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => { }}>
                        我的预约
                    </Item>
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {this.goPatient() }}
                        platform="android"
                    >
                       就诊人管理
                    </Item>
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => { }}
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
                <Button onClick={this.goOut} style={{marginTop:80,marginLeft:20,marginRight:20,height:40,fontSize:16,lineHeight:"40px"}}>退出登录</Button>
            </div>
        )
    }
}