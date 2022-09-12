import * as ActionType from "../ActionType";

const initval = {
    isLoading: false,
    medicinces: [],
    error: ''
}

export const medicincesReduex = (state = initval, action) => {
    console.log(action, action.type);
    switch (action.type) {
        case ActionType.GET_VALUE:
            return {
                ...state,
                isLoading: false,
                medicinces: action.payload,
                error: ''
            }
        case ActionType.ADD_MEDICINCES:
            return {
                ...state,
                isLoading: false,
                medicinces: state.medicinces.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_MEDICINCES:
            return {
                ...state,
                isLoading: false,
                medicinces: state.medicinces.filter((m) => m.id !== action.payload),
                error: ''
            }
        case ActionType.LOADING_MEDICINCES:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.ERROR_MEDICINCES:
            return {
                ...state,
                isLoading: false,
                medicinces: [],
                error: action.payload
            }
        case ActionType.UPDATE_MEDICINCES:
            return {
                ...state,
                isLoading: false,
                medicinces: state.medicinces.map((u) => {
                    if (u.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return u;
                    }
                }),
                error: ''
            }
        default:
            return state;
    }
}