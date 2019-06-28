
import {observable, action, computed, autorun} from "mobx";

class UserInfo {
    @observable isLogin = true;
    @observable usertel = "17671616715";
    @action changeIsLogin = ()=>{
        this.isLogin = !this.isLogin;
    }
    @action changeTel = tel =>{
        this.usertel = tel;
    }
}

export default new UserInfo();