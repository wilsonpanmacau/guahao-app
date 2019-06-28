


import { Head } from "~/components/head";
import { Card, WingBlank, Tabs, WhiteSpace, Badge, Button,  Modal} from 'antd-mobile';
const alert = Modal.alert;
import './index.scss';
import axios from "../../../utils/axios";
import { observer } from "mobx-react";
import userInfo from "~/mobx/userInfo"
const tabs = [
    { title: <Badge>挂号订单</Badge> },
    { title: <Badge>朝阳医院挂号</Badge> },
];

@observer
export default class MyOrder extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        const usertel = userInfo.usertel;
        console.log(usertel);
        axios.post("/react/findPatientInfo", { usertel }).then(res => {
            console.log(res);
            this.setState({
                data: res.data.result
            })
        })
    }

    delPatientInfo = (id) => {
        console.log(id);
        axios.post("/react/delPatientInfo", { id }).then(res => {
            console.log(res);
            location.reload();
        })
    }

     showAlert = (id) => {
        const alertInstance = alert('是否确定取消挂号', [
          { text: '否', onPress: () => console.log('cancel'), style: 'default' },
          { text: '是', onPress: () => this.delPatientInfo(id) },
        ]);
        setTimeout(() => {
          // 可以调用close方法以在外部close
          console.log('auto close');
          alertInstance.close();
        }, 500000);
      };

    render() {
        const { data } = this.state
        return (
            <div>
                <Head title="我的预约" show={true}></Head>
                <WhiteSpace />
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    tabBarUnderlineStyle={{ borderBottom: 'none' }}
                >

                    {
                        data.map((item, i) => {
                            return (
                                <div key={i}>
                                    <WhiteSpace size="xs" />
                                    <Card full >
                                        <Card.Body>
                                            <div >
                                                <h3>{item.hospital} {item.catname}</h3>
                                                <p>{item.time}</p>
                                                <p>就诊人:{item.name} 预约号:{item.rand}</p>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer
                                            content={<h3 style={{ color: 'red' }}>待就诊</h3>}
                                            extra={

                                                <Button
                                                    type="primary" inline size="small" style={{ marginRight: '4px', marginButtom: 4 }}
                                                    onClick={()=>this.showAlert(item._id)}
                                                    // onClick={() => 
                                                    //     alert('是否确定取消订单', [
                                                    //         { text: 'Cancel', onPress: () => console.log('cancel') },
                                                    //         { text: 'Ok', onPress: () => this.delPatientInfo(item._id) },
                                                    //     ])
                                                    // }
                                                >取消挂号
                                              </Button>
                                            } />
                                    </Card>
                                </div>
                            )
                        })
                    }
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, height: '200px', backgroundColor: '#fff' }}>
                        <h3>这里空空如也</h3>
                    </div>
                </Tabs>
                <WhiteSpace />

            </div>
        )
    }
}


