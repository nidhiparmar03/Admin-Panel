import * as ActionType from '../ActionType';

const intival = {
    isLoading: false,
    patients: [],
    error: ''
}

export const Patientsreduex = (state = intival, action) => {
    // console.log(state,action);
    switch (action.type) {
        case ActionType.GET_PATIENTSDATA:
            return {
                ...state,
                isLoading: false,
                patients: action.payload,
                error: ''
            }
        case ActionType.LOADING_PATIENTS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.ERROR_PATIENTS:
            return {
                ...state,
                isLoading: false,
                patients: [],
                error: action.payload
            }
        case ActionType.ADD_PATIENTS:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_PATIENTS:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.filter((p) => p.id !== action.payload),
                error: ''
            }
        case ActionType.UPDATE_PATIENTS :
            return {
                ...state,
                isLoading : false,
                patients : state.patients.map((pu) =>{
                    if(pu.id === action.payload.id){
                        return action.payload;
                    }else{
                        return pu;
                    }
                }),
                error : ''
            }
        default:
            return state;
    }
}