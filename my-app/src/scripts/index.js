




import ReactDOM, {render} from "react-dom";  //  ReactDOM.render
import { IndexView } from "./views";

const rootEle = document.getElementById("app");
import {Provider} from  "react-redux";
import store from './store'

const hotRender = ()=>{
    render(
        <Provider store={store}>
            <IndexView/>
        </Provider>,
        rootEle
    )
}

hotRender();