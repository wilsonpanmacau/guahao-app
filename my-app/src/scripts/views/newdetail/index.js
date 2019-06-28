

import './index.scss';

import { Head } from "~/components/head"
import { connect } from "react-redux";
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import axios from 'axios';

@connect(
    state => ({
        ...state.data
    })
)
export default class NewDetail extends Component {

    state = {
        data: [],
        skip: 2
    }

    componentWillMount() {
        const skip = this.state.skip;

        axios.get("/react/getClassifyDetail", { params: { catname: "骨科", limit: 2 } }).then(res => {
            console.log(12323)
            console.log(res);
            this.setState({
                data: res.data.result,
            })
        })
    }
    change = () => {
        const { skip } = this.state;
        if (skip + 2 < 10) {
            this.setState({
                skip: skip + 2,
            })
        } else {
            this.setState({
                skip: 0,
            })
        }
        console.log(this.state.skip);
        axios.get("/react/getClassifyDetail", { params: { catname: "骨科", limit: 2, skip: this.state.skip } }).then(res => {
            console.log(12323)
            console.log(res);
            this.setState({
                data: res.data.result,
            })
        })
    }


    render() {
        const {
            newdetail,
        } = this.props
        return (
            <div>
                <Head title={newdetail.title} show={true}></Head>
                <div>
                    <ul >
                        <li style={{ marginTop: 15, fontSize: 18 }}>
                            <h3 style={{}}>{newdetail.title}</h3>
                        </li>
                        <li style={{ fontSize: 14, color: "#888", lineHeight: "30px" }}>
                            <p>{newdetail.from} &nbsp;&nbsp;  {newdetail.time} </p>
                        </li>
                        <li >
                            <img style={{ width: "90%", height: 220, marginLeft: "5%", marginTop: 15 }} src={newdetail.img} alt="" />
                        </li>
                        <li>
                            <div style={{ fontSize: 14, color: "#333", lineHeight: "24px", marginTop: 15 }}>{newdetail.content}</div>
                        </li>
                    </ul>

                    <div>
                        <WhiteSpace size="xs" />
                        <WingBlank size="xs">
                            <Card full>
                                <Card.Header
                                    title={<div>
                                        <span style={{ color: '#4099fb', fontSize: 15 }}>推荐医生</span>
                                        <span style={{ marginLeft: 15, fontSize: 12 }}>快速挂号资讯</span></div>}
                                    extra={<span onClick={this.change}>换一换</span>}
                                />
                                {
                                    this.state.data.map((item, i) => {
                                        return (
                                            <div key={i} onClick={() => this.gotoDoc(item.userid)}>
                                                <Card >
                                                    <Card.Header
                                                        title={<div >
                                                            <p style={{ fontSize: 16 }}>{item.username}</p>
                                                            <p style={{ width: 120, fontSize: 14 }}>{item.catname}·{item.title}</p>
                                                        </div>
                                                        }
                                                        thumb={item.avatar}
                                                        extra={<div style={{ lineHeight: 2 }}>
                                                            <p style={{ fontSize: 14, color: '#4099fb' }}>免费预约</p>

                                                        </div>}
                                                    />
                                                    <Card.Body>
                                                        <div style={{ fontSize: 14 }}>{item.adept}</div>
                                                    </Card.Body>
                                                    <Card.Footer />
                                                </Card>
                                                <WhiteSpace size="xs" />
                                            </div>
                                        )
                                    })
                                }
                            </Card>
                        </WingBlank>
                    </div>
                </div>
            </div>
        )
    }
}