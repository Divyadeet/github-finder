import {
    SET_LOADING,
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_ALERT
} from '../Types';

export default (state, action) => {
    switch(action.type) {
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading:false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}