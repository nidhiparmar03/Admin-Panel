import * as ActionType from '../ActionType';

const initval = {
    isLoading : false,
    doctors : [],
    error : ''
}

export const doctorsreducer = (state = initval , action) => {
    // console.log(state.doctors,action.type,action);
    switch(action.type) {
        case ActionType.GET_DOCTORSDATA :
            return {
                ...state,
                isLoading : false,
                doctors : action.payload,
                error : ''
            }
        case ActionType.LOADING_DOCTORSDATA  :
            return {
                ...state,
                isLoading : true ,
                error : ''
            }
        case ActionType.ERROR_DOCTORSDATA : 
            return {
                ...state,
                isLoading : false,
                doctors : [],
                error : action.payload
            }
        case ActionType.ADD_DOCTORSDATA :
             return {
                ...state,
                isLoading : false,
                doctors : state.doctors.concat(action.payload),
                error : ''
             }
        case ActionType.DELETE_DOCTORSDATA :
            return {
                ...state,
                isLoading : false,
                doctors : state.doctors.filter((f) => f.id !== action.payload),
                error : ''
            }
        case ActionType.UPDATE_DOCTORSDATA :
            return {
                ...state,
                isLoading : false,
                doctors : state.doctors.map((du) => {
                    if(du.id === action.payload.id){
                        return action.payload;
                    }else{
                        return du;
                    }
                })
            }
        default :
            return state;
    }
}