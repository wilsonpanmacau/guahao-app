

import { connect } from "react-redux";
import './index.scss'
import axios from "axios";
import { Head } from "~/components/head"
import { Card, InputItem, List, WhiteSpace, DatePicker, WingBlank, Button, Switch, Stepper, Range, TextareaItem, Toast } from 'antd-mobile';
const Item = List.Item;
import userInfo from "~/mobx/userInfo"
import { getPatientInfo } from "~/actions";
import history from "@/utils/history";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
    // set the minDate to the 0 of maxDate
    minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())} :${pad(date.getMinutes())}`; // 
    return `${dateStr} ${timeStr}`;
}

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick, children }) => (
    <div
        onClick={onClick}
        style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
    >
        {children}
        <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    </div>
);


@connect(
    state => ({
        ...state.data
    })
)
export default class CodeDetail extends Component {
    state = {
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
    }

    componentWillMount() {
        // const { docdetail } = this.props;
        // console.log(docdetail);
    }
    validateIdp = (rule, date, callback) => {
        if (isNaN(Date.parse(date))) {
            callback(new Error('Invalid Date'));
        } else {
            const cDate = new Date(date);
            const newDate = new Date(+this.state.dpValue);
            newDate.setFullYear(cDate.getFullYear());
            newDate.setMonth(cDate.getMonth());
            newDate.setDate(cDate.getDate());
            // this.setState({ dpValue: newDate });
            setTimeout(() => this.props.form.setFieldsValue({ dp: newDate }), 10);
            callback();
        }
    }
    validateDatePicker = (rule, date, callback) => {
        if (date && date.getMinutes() !== 15) {
            callback();
        } else {
            callback(new Error('15 is invalid'));
        }
    }

    Confirm = () => {
        const name = this.uname.state.value;
        const idcard = this.card.state.value;
        const tel = this.phone.state.value;
        const time = this.time.state.value;
        const text = this.dtext.state.value;
        const rand = new Date().getTime();
        console.log(rand);

        const mobileReg = /^1(3|5|7|8|9)\d{9}$/
        const idcarReg = /^\d{18}$/

        if (name) {
            if (idcarReg.test(idcard)) {
                if (mobileReg.test(tel)) {
                    if (time) {

                        const { dispatch, docdetail } = this.props;
                        const catname = docdetail.catname;
                        const username = docdetail.username;
                        const hospital = docdetail.hospital;
                        const cost = docdetail.cost;
                        const usertel = userInfo.usertel;
                        const parientinfo = {
                            rand,
                            name,
                            idcard,
                            tel,
                            time,
                            text,
                            catname,
                            username,
                            hospital,
                            cost,
                            usertel
                        }
                        dispatch(getPatientInfo(parientinfo));
                        axios.get("/react/addPatientInfo",
                            {
                                params: {
                                    ...parientinfo
                                }
                            }).then(res => {
                                console.log(res);
                            })
                        history.push("/app/patientinfo")

                    } else {
                        Toast.fail("请选择就诊时间", 1)
                    }
                } else {
                    Toast.fail("请输入正确的就诊人手机号", 1)
                }
            } else {
                Toast.fail("请输入正确的就诊人身份证", 1)
            }

        } else {
            Toast.fail("请输入正确的就诊人姓名", 1)
        }
    }

    render() {
        const { docdetail } = this.props;
        return (
            <div>
                <Head title="号源详情" show={true} ></Head>

                <Card>
                    <Card.Header
                        title={<h2 style={{ fontSize: 20 }}>预约信息</h2>}
                    />

                    <Card.Body>
                        <ul className="body">
                            <li>
                                <h3>出诊医院:{docdetail.hospital}</h3>
                            </li>
                            <li>
                                <h3>医生姓名:{docdetail.username}</h3>
                            </li>
                            <li>
                                <h3>就诊科室:{docdetail.catname}</h3>
                            </li>
                            <li>
                                <h3>医事服务费:￥{docdetail.cost}</h3>
                            </li>
                            <li>
                                <p style={{ fontSize: 14, color: '#60acfd' }}>医师服务费均在就诊时由医院直接收取,本平台不收取任何费用</p>
                            </li>
                            <li>
                                <p>医生特长:{docdetail.adept}</p>
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
                <WhiteSpace />
                <Card>
                    <Card.Header
                        title={<h2 style={{ fontSize: 20 }}>就诊人信息</h2>}
                    />

                    <Card.Body>
                        <form>
                            <List
                            >
                                <InputItem
                                    ref={el => this.uname = el}
                                    clear
                                    placeholder="请输入就诊人姓名"
                                >就诊人姓名</InputItem>
                                <InputItem
                                    ref={el => this.card = el}
                                    placeholder="请输入就诊人身份证号" clear>
                                    身份证号
                                </InputItem>
                                <InputItem
                                    ref={el => this.phone = el}
                                    clear
                                    placeholder="请输入就诊人手机号"
                                >就诊人手机号</InputItem>

                                <InputItem
                                    ref={el => this.time = el}
                                    clear
                                    placeholder="请选择就诊时间"
                                    value={this.state.dpValue && formatDate(this.state.dpValue)}
                                    onClick={() => this.setState({ visible: true })}
                                >
                                    就诊时间
                                    </InputItem>
                                <DatePicker
                                    visible={this.state.visible}
                                    value={this.state.dpValue}
                                    onOk={date => this.setState({ dpValue: date, visible: false })}
                                    onDismiss={() => this.setState({ visible: false })}
                                />
                                <TextareaItem
                                    ref={el => this.dtext = el}
                                    style={{ backgroundColor: '#eee', borderRadius: 10 }}
                                    rows={3}
                                    placeholder="请描述一下就诊人的疾病/症状"
                                />
                                <WhiteSpace />
                                <Button type="primary" onClick={this.Confirm}>确认预约</Button>
                                <WhiteSpace />
                            </List>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}