
import { Card, WhiteSpace } from 'antd-mobile';
import "./index.scss"
import { getDetail,getDocDetail} from "~/actions";
import { Head } from "~/components/head"
import { connect } from "react-redux";
import history from "@/utils/history";

@connect(
    state => ({
        ...state.data
    })
)
export default class Detail extends Component {

    componentWillMount() {
        console.log(this.props.detail)
    }

    gotoDoc=(userid)=>{

        const {dispatch} =this.props;
        dispatch(getDocDetail({

            url:"/react/getDocDetail",
            params:{
                userid
            },
            cb: (res) => {
                console.log(res);
                history.push("/app/docdetail");
            }
        }))

       

    }


    render() {
        const {
            detail,
            catname
        } = this.props
        return (
            <div>
                <Head title={catname} show={true}></Head>
                {
                    detail.map((item, i) => {
                        return (
                            <div key={i} className="doc" onClick={()=>this.gotoDoc(item.userid)}>
                               
                            <Card >
                              <Card.Header
                                title={<div >
                                    <p style={{fontSize:16,marginBottom:5,color:"#333"}}>{item.username}</p>
                                    <p style={{width:130,fontSize:14,color:"#777"}}>{item.catname}·{item.title}</p>
                                    </div>
                                }
                                thumb={item.avatar}
                                extra={<div style={{lineHeight:2}}>
                                    <p style={{fontSize:13,color:'#60acfd'}}>已预约: {item.num}</p>
                                    <p style={{fontSize:12}}>专享挂号费 <s>￥{item.cost2}</s> <span style={{color:'orange'}}>￥{item.cost}</span></p>
                                    </div>}
                              />
                              <Card.Body>
                                <div style={{fontSize:13}}>{item.adept}</div>
                              </Card.Body>
                              <Card.Footer/>
                            </Card>
                            <WhiteSpace size="xs" />
                          </div>
                        )
                    })
                }

            </div>
        );
    }
}