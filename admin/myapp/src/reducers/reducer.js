
const initialState = {
    getStore: false,
    dataSelect: [],
}
const initialState1 = {
    time: {
        checkStart: false,
        valueTimeStart: null,
        checkEnd: false,
        valueTimeEnd: null,
        checkLogin: false,
        checkShowTag: false,
        valueTags: null
    }
}
const initialState2 = {
    dataTable: [],
}
const initialState3 = {
    dataBundle: {},
    listProduct: [],
    listRules: []
}
function Reducer(state = initialState, actions = {}) {
    switch (actions.type) {
        case "DATA_SUCCESS":
            return {
                ...actions,
                getStore: true
            }
        default:
    }

    return state;
}
function Reducer1(state = initialState1, actions = {}) {
    switch (actions.type) {
        case "DATA_TIME":
            return {
                ...actions,

            }
        default:
    }
    return state;
}
function Reducer2(state = initialState2, actions = {}) {
    switch (actions.type) {
        case "DATA_RULES":
            return {
                ...actions,

            }
        default:
    }
    return state;
}
function Reducer3(state = initialState3, actions = {}) {
    switch (actions.type) {
        case "EDIT_BUNDLE":
            return {
                ...actions,

            }
        default:
    }
    return state;
}
export { Reducer, Reducer1, Reducer2, Reducer3 } 
