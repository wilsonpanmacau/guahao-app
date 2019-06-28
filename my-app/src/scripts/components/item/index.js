import { Icon, Grid } from 'antd-mobile';
import "./index.scss"
import history from "@/utils/history";
import { setTitle } from '~/actions';
import { connect } from "react-redux";
@connect(
    state => ({
        ...state.data
    })
)
export default class Item extends Component {
    goDetail(title){
        const { dispatch } = this.props;
        dispatch(setTitle(title))
        history.push("/app/hosDetail");
        
    }
    render() {
        const {
            data
        } = this.props
        // console.log(data);
        return (
            <div className="hosDiv" onClick={()=>{this.goDetail(data.title)}}>
                <img src={data.img} alt="" />
                <div className="detail">
                    <p className="title"><span className="level">{data.level}</span>{data.title}</p>
                    <p className="tel">电话: {data.tel}</p>
                    <p className="address">地址: {data.address}</p>
                    <p className="time">{data.time}</p>
                </div>
                <Icon type="right" size="xs" style={{marginTop:3,color:"#888"}}></Icon>
            </div>
        )
    }
}

