
import './index.scss';
import { Head } from "~/components/head";
import { Card, WingBlank, WhiteSpace, Button, InputItem ,Toast} from 'antd-mobile';
import axios from "@/utils/axios"
import { connect } from "react-redux";
import userInfo from "~/mobx/userInfo"
import history from "@/utils/history";
import { observer } from "mobx-react";
@connect(
    state => ({
        ...state.data
    })
)
@observer

export default class DocDetail extends Component {
    state = {
        isCollect: false,
        icon: "iconfont icon-xihuan",
        comments: [
           
        ]
    }
    componentWillMount() {
        const { docdetail } = this.props;
        console.log(docdetail)
        axios.get("/react/findComments",{params:{userid:docdetail.userid}}).then(res=>{
            console.log(res);
            this.setState({
                comments:res.data.result
            })
        })
        if (docdetail.userid && userInfo.usertel) {
            console.log(docdetail);
            let userid = docdetail.userid;
            const usertel = userInfo.usertel;
            // let usertel = "17671616715"
            console.log(userid + "------" + usertel)
            axios.post("/react/findCollect", { usertel, userid }).then(res => {
                console.log(res);
                if (res.data.type) {
                    this.setState({
                        icon: "iconfont icon-xihuan1"
                    })
                }
            })
        }
    }
    collect = () => {
        if (userInfo.isLogin) {
            const { docdetail } = this.props;
            console.log(docdetail)
            const usertel = userInfo.usertel;
            console.log(this.props)
            let userid = this.props.docdetail.userid;
            console.log(usertel + "-----" + userid)
            axios.post("/react/addCollect", { usertel, userid, ...docdetail }).then(res => {
                console.log(res);
                if (res.data.type) {
                    this.setState({
                        icon: "iconfont icon-xihuan1"
                    })
                } else {
                    this.setState({
                        icon: "iconfont icon-xihuan"
                    })
                }

            })
        } else {
            Toast.fail("还未登录,请先登录", 1);
            history.push("/login");
        }
    }
    appoint = () => {
        if (userInfo.isLogin) {
            history.push("/app/codedetail");

        } else {
            Toast.fail("还未登录,请先登录", 1);
            history.push("/login");
        }
    }
    addCom = () => {
        if (userInfo.isLogin) {
            console.log(this.title.state.value + "-------" + this.content.state.value)
            var title = this.title.state.value;
            var content = this.title.state.value;
            var usertel = userInfo.usertel;
            var userid = this.props.docdetail.userid;
            var date = new Date();
            var time = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate()
            axios.post("/react/addComment", {
                title, content, usertel, userid,time
            }).then(res => {
                console.log(res)
                this.title.state.value = "";
                this.content.state.value = "";
            })
        } else {
            Toast.fail("还未登录,请先登录", 1)
            history.push("/login");
        }
    }
    render() {
        const { docdetail } = this.props;
        const { comments } = this.state;
        return (
            <div>
                <Head title="医生详情" show={true}></Head>

                <div>
                    <Card className="card">
                        <Card.Header
                            title={<div style={{ width: 210, color: '#fff' }}>
                                <p style={{ fontSize: 16, marginTop: 10, marginBottom: 8 }}>{docdetail.username} <span style={{ fontSize: 13 }}>{docdetail.title}</span></p>
                                <div style={{ fontSize: 12, width: 160 }}>{docdetail.honor}</div>
                            </div>
                            }
                            thumb={docdetail.avatar}
                            extra={
                                <div style={{ width: 90, height: 55 }}>
                                    <p style={{ width: 60, height: 18, lineHeight: "18px", fontSize: 10, borderRadius: 20, backgroundColor: "#fff", textAlign: "center", color: "#60acfd", marginLeft: 34}}>医保定点</p>
                                    <i ref="icon" className={this.state.icon} style={{ fontSize: 22, color: "#fff", marginTop: 22, display: "block" }} onClick={this.collect}></i>
                                </div>
                            }
                        />

                        <Card.Footer />
                    </Card>
                    <WhiteSpace size="md" />
                    <Card.Header
                        title="医生介绍"
                    // thumb={docdetail.avatar}
                    />
                    <Card.Body>
                        <div style={{ fontSize: 14, color: "#999" }}>{docdetail.username} {docdetail.hospital} {docdetail.title} {docdetail.honor}</div>
                    </Card.Body>
                    <WhiteSpace size="md" />
                    <Card.Header
                        title="擅长疾病"
                    // thumb={docdetail.avatar}
                    />
                    <Card.Body>
                        <div style={{ fontSize: 14, color: "#999" }}>{docdetail.adept}</div>
                        <Button onClick={this.appoint} style={{ marginTop: 20, marginLeft: 20, marginRight: 20, height: 40, fontSize: 16, lineHeight: "40px", borderRadius: 20, backgroundColor: "greenyellow", color: "#fff" }}>预约挂号</Button>
                    </Card.Body>


                    <WhiteSpace size="md" />
                    <Card.Header
                        title="病人评价"
                    // thumb={docdetail.avatar}
                    />
                    <Card.Body>
                        {
                            comments.map((c, i) => {
                                return (
                                    <div key={i} style={{ fontSize: 14, color: "#999", borderBottom: "1px solid #ccc" ,padding:"15px 0" }}>
                                        <p style={{color:"#333",marginBottom:10}}>标题: {c.title}</p>
                                        <p style={{color:"#666",marginBottom:10}}>{c.content}</p>
                                        <p>时间: {c.time}</p>
                                    </div>
                                )
                            })
                        }
                        <InputItem
                            placeholder="请输入标题"
                            ref={el => this.title = el}
                        ><div >标题</div></InputItem>
                        <InputItem
                            placeholder="请输入内容"
                            ref={el => this.content = el}
                        ><div>内容</div></InputItem>
                        <Button onClick={this.addCom} style={{ marginTop: 20, marginLeft: 20, marginRight: 20, height: 40, fontSize: 16, lineHeight: "40px", borderRadius: 20, backgroundColor: "#778", color: "#fff" }}>添加评论</Button>
                    </Card.Body>
                </div>





            </div>
        )
    }
}