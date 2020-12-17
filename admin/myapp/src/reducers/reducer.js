
const initialState = {
    getStore: false,
    dataSelect: []
}
export default function Reducer(state = initialState, actions = {}) {
    console.log("Action:", actions);
    switch (actions.type) {
        case "DATA_SUCCESS":
            return {
                ...actions,
                getStore: true
            }
    }
    return state;
}