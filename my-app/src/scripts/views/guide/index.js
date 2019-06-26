

import "./index.scss";
import Swipe from "@/scripts/components/swipe"

const Item = Swipe.item;


export class Guide extends Component{
    state = {
        imgs:[
            // require("@/assets/images/Screenshot1.png"),
            // require("@/assets/images/Screenshot2.png"),
            // require("@/assets/images/Screenshot3.png"),
            // require("@/assets/images/Screenshot4.png"),
        ]
    }
    gotoApp(id){
        const {history} = this.props;
        if(id==this.state.imgs.length-1){
            history.push("/app/home");
        }
    }
    componentWillMount(){
        // if(localStorage.pcount){
        //     localStorage.pcount++;
            // if(localStorage.pcount>3){
            //     const {history} = this.props;
            //     history.push("/app/home");
            // }
        // }else{  
        //     localStorage.pcount = 1;
        // }
    }
    render(){
        return (
            <div>
                <h2>hahaha</h2>
            </div>
        )
    }
}