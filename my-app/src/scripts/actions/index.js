
import axios from "axios";


export const getCatname = (catname) => {
    return {
        type: "getCatname",
        catname
    }
}

export const getDetail = ({ url, params, cb }) => {
    return axios.get(url, { params }).then(res => {
        cb(res);
        return {
            type: "getDetail",
            detail: res.data.result,
        }
    })
}

export const getNewDetail = ({ url, params, cb }) => {
    return axios.get(url, { params }).then(res => {
        console.log("12323")
        console.log(res.data.result)
        cb(res);
        return {
            type: "getNewDetail",
            newdetail: res.data.result,
        }
    })
}

export const getDocDetail = ({ url, params, cb }) => {
    return axios.get(url, { params }).then(res => {
        console.log("12323")
        console.log(res.data.result)
        cb(res);
        return {
            type: "getDocDetail",
            docdetail: res.data.result,
        }
    })
}

export const getPatientInfo = (patientinfo) =>{
    return{
        type:"getPatientInfo",
        patientinfo
    }
}
export const getTypeName = (typename) => {
    return {
        type: "getTypeName",
        typename
    }
}
export const getHosList = ({ url, params, cb }) => {
    return axios.get(url, { params }).then(res => {
        cb(res);
        return {
            type: "getHosList",
            hosList: res.data.result,
        }
    })
}
export const setTitle = (hostitle) => {
    return {
        type: "setTitle",
        hostitle
    }
}