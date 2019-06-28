import "./index.scss"
import { Head } from "~/components/head"
import axios from "@/utils/axios"
import { ListView } from 'antd-mobile';
import Item from "../../components/item";
import { connect } from "react-redux";
@connect(
    state => ({
        ...state.data
    })
)
export default class HospitalList extends Component {
    state = {
        hospitals: [],
        type: ""
    }
    componentWillMount() {
        console.log(this.props)
    }
    render() {
        const {
            typename,
            hosList
        } = this.props
        return (
            <div>
                <Head title={typename} show={true}></Head>
                {
                    hosList.map((hos, i) => {
                        return (
                            <Item key={i} data={hos}></Item>
                        )
                    })
                }
            </div>
        )
    }
}

