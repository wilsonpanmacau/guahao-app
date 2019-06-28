import "./index.scss"
import { Head } from "~/components/head"
import axios from "@/utils/axios"
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from "react-redux";
import history from "@/utils/history";
import { getDocDetail } from "~/actions";
@connect(
    state => ({
        ...state.data
    })
)
export default class HosDetail extends Component {
    state = {
        detail: {},
        data: []
    }
    componentWillMount() {
       
        axios.get("/react/getHosDetail", { params: { title: this.props.hostitle } }).then(res => {
            // console.log(res);
            this.setState({
                detail: res.data.result
            })
        })
        axios.get("/react/getClassifyDetail", { params: { catname: "骨科", limit: 2 } }).then(res => {
            console.log(res);
            this.setState({
                data: res.data.result,
            })
        })
    }
    gotoDoc = (userid) => {

        const { dispatch } = this.props;
        // dispatch(setTitle(title))
        dispatch(getDocDetail({

            url: "/react/getDocDetail",
            params: {
                userid
            },
            cb: (res) => {
                console.log(res);
            }
        }))

        history.push("/app/docdetail");

    }
    render() {
        const {
            detail,

        } = this.state
        const {
            hostitle
        } = this.props
        return (
            <div>
                <Head show={true} title={hostitle}></Head>
                <div className="hos">
                    <img src={detail.img} alt="" className="img" />
                    <div className="shadow">
                        <p className="hosweb">官方网站: {detail.web}</p>
                        <p className="hostel">详细地址: {detail.address}</p>
                    </div>
                </div>


                <div className="jiaotong">
                    <p className="how"><span>交通方式: </span>{detail.howCome}</p>
                    <p className="jieshao"><span>医院介绍: </span>{detail.detail}</p>
                </div>
                <div>
                    <WhiteSpace size="xs" />
                    <WingBlank size="xs">
                        <Card full>
                            <Card.Header
                                title={<div>
                                    <span style={{ color: '#4099fb', fontSize: 15 }}>推荐医生</span>
                                    <span style={{ marginLeft: 15, fontSize: 12 }}>快速挂号资讯</span></div>}

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
        )
    }
}
