


const defaultState = {
    catname: "",
    typename: "",
    detail: [],
    newdetail: {},
    docdetail: {},
    patientinfo:{},
    hosList: [],
    hostitle: "",
}

export default (state = defaultState, action) => {

    switch (action.type) {
        case "getCatname":
            return { ...state, catname: action.catname }
            break;

        case "getDetail":
            return { ...state, detail: action.detail }
            break;

        case "getNewDetail":
            return { ...state, newdetail: action.newdetail }
            break;

        case "getDocDetail":
            return { ...state, docdetail: action.docdetail }
            break;
        case "getPatientInfo":
            return { ...state, patientinfo: action.patientinfo }
            break;

        case "getHosList":
            return { ...state, hosList: action.hosList }
            break;
        case "getTypeName":
            return { ...state, typename: action.typename }
            break;
        case "setTitle":
            return { ...state, hostitle: action.hostitle }
            break;
        default:
            return state
            break;
    }
}