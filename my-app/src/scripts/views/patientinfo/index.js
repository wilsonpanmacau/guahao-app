
import  "./index.scss";
import { Head } from "~/components/head"
import {connect} from "react-redux";
import { Card,  WhiteSpace} from 'antd-mobile';

@connect(
    state => ({
        ...state.data
    })
)
export default class Patientinfo extends Component{

    componentWillMount(){
        
    }

    render(){
        console.log(this.props);
        const {patientinfo} = this.props;
        return(
            <div>
                <Head title="挂号信息" show={true} ></Head>
                <Card>
                    <Card.Header
                        title={<h2 style={{ fontSize: 20 }}>就诊信息</h2>}
                    />
                    <Card.Body>
                        <ul className="body">
                            <li>
                                <h3>预约号:{patientinfo.rand}</h3>
                            </li>
                            <li>
                                <h3>就诊人:{patientinfo.name}</h3>
                            </li>
                            <li>
                                <h3>就诊医院:{patientinfo.hospital}</h3>
                            </li>
                            <li>
                                <h3>就诊科室:{patientinfo.catname}</h3>
                            </li>
                            <li>
                                <h3>就诊时间:{patientinfo.time}</h3>
                            </li>
                            <li>
                                <h3>医生姓名:{patientinfo.username}</h3>
                            </li>
                            <li>
                                <h3>医事服务费:￥{patientinfo.cost}</h3>
                            </li>
                            <li>
                                <p style={{ fontSize: 14, color: '#60acfd' }}>医师服务费均在就诊时由医院直接收取,本平台不收取任何费用</p>
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
                <WhiteSpace />
                <Card>
                    <Card.Header
                        title={<h2 style={{ fontSize: 20 }}>注意事项</h2>}
                    />
                    <Card.Body>
                        <h3>1.每个账号每月挂号和取消数量有上限,请按需预约,若超过取消上限则不能再次挂号;</h3>
                        <h3>2.如不能按时就诊,请于就诊前一日15:30前取消预约;</h3>
                        <h3>3.当日号源停止挂号时间15:30</h3>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}