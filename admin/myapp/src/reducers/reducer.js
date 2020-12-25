
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
function Reducer(state = initialState, actions = {}) {
    switch (actions.type) {
        case "DATA_SUCCESS":
            return {
                ...actions,
                getStore: true
            }
    }

    return state;
}
function Reducer1(state = initialState1, actions = {}) {
    switch (actions.type) {
        case "DATA_TIME":
            return {
                ...actions,

            }
    }
    return state;
}
function Reducer2(state = initialState2, actions = {}) {
    switch (actions.type) {
        case "DATA_RULES":
            return {
                ...actions,

            }
    }
    return state;
}

export { Reducer, Reducer1, Reducer2 } 
