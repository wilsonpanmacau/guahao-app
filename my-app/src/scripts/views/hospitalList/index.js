import "./index.scss"
import { Head } from "~/components/head"
import axios from "@/utils/axios"

export default class HospitalList extends Component {
    state = {
        hospitals: []
    }
    componentWillMount() {
        // var type = JSON.parse(location.href.split("?")[1]);
        // console.log(type)
        axios.get("/react/getHospitals", {}).then(res => {
            console.log(res)
            this.setState({
                hospitals: res.data.result
            })
            console.log(this.state.hospitals)
        })
    }
    render() {
        return (
            <div>
                <Head title=""></Head>
                
            </div>
        )
    }
}