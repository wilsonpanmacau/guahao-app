import React, { Component } from "react"
import "./index.scss"
import { WingBlank, Carousel, WhiteSpace, Icon, NoticeBar } from "antd-mobile"
import yuyue from "../../../assets/images/yuyue.png"
import remen from "../../../assets/images/remen.png"
import jiankang from "../../../assets/images/jiankang.png"
import geren from "../../../assets/images/geren.png"
import PropTypes from "prop-types"
import swi1 from "../../../assets/images/swiper.jpg"


export default class Home extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 186,
    }
    toAppointment=()=>{
        const { history } = this.context.props;
        history.push("/app/appointment")
    }
    toHotClassify=()=>{
        const { history } = this.context.props;
        history.push("/app/hotClassify")
    }
    toNews=()=>{
        const { history } = this.context.props;
        history.push("/app/news")
    }
    toMy=()=>{
        const { history } = this.context.props;
        history.push("/app/my")
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        return (
            <div>
                <div className="top">
                    <WhiteSpace />
                    <WingBlank />
                    <p className="search"><Icon type="search" size="sm" /><span>搜医院</span></p>
                    <WingBlank />
                    <WhiteSpace />
                    <WingBlank>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="http://www.alipay.com"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={swi1}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                    <WingBlank>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                       疾控中心提醒:注意肠道病毒感染------疾控中心提醒:注意肠道病毒感染--------疾控中心提醒:注意肠道病毒感染----疾控中心提醒:注意肠道病毒感染--------疾控中心提醒:注意肠道病毒感染
                    </NoticeBar>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                </div>
                <div className="bottom">
                    <div><img onClick={this.toAppointment} src={yuyue} alt="我是一个憨憨"/></div>
                    <div><img onClick={this.toHotClassify} src={remen} alt=""/></div>
                    <div><img onClick={this.toNews} src={jiankang} alt=""/></div>
                    <div><img onClick={this.toMy} src={geren} alt=""/></div>
                </div>
            </div>
        )
    }
}

Home.contextTypes ={
    props:PropTypes.object
}
