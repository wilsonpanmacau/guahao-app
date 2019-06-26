

export const foots =  [
    {txt:"书架",path:"/app/home",name:"home",icon:"icon-shu",on:"home-on.png",off:"home-off.png"},
    {txt:"书城",path:"/app/bookstore",name:"bookstore",icon:"icon-jiangbei"},
    {txt:"分类",path:"/app/classify",name:"classify",icon:"icon-shu1"},
    {txt:"我的",path:"/app/my",name:"my",icon:"icon-wode"}
]

import "./index.scss"
import  {Link,NavLink} from "react-router-dom"
import {Badge} from "antd-mobile"

export const Foot = ()=>{
    return (
       <footer>
           {
               foots.map((item,i)=>{
                   return (
                       <div key={i}>
                           <NavLink to={item.path} activeClassName="nav-active" > 
                                <i className={"iconfont icon " + item.icon} ></i>
                                <span> {item.txt}</span>
                                {/* {i==2&&<Badge className="hot" text={8} style={{ marginLeft: 12 }}></Badge>} */}
                           </NavLink>
                       </div>
                   )
               })
           }
       </footer>
    )
}