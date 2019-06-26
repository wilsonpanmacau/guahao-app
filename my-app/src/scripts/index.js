


import ReactDOM, {render} from "react-dom";  //  ReactDOM.render
import { IndexView } from "./views";

const rootEle = document.getElementById("app");

const hotRender = ()=>{
    render(
        <IndexView/>,
        rootEle
    )
}

hotRender();