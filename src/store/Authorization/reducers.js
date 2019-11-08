import * as actions from './actions';

const defaultState = {
    login: '',
    password: '',
    authorized: false
};

export const authorization = (state = defaultState, action) => {
    switch (action.type) {
        case actions.GET_LOGIN: {
            return {
                ...state,
                login: action.payload.login
            };
        }
        case actions.GET_PASSWORD: {
            return {
                ...state,
                password: action.payload.password
            };
        }
        case actions.AUTHORIZE: {
            return {
                ...state,
                authorized: action.payload.authorized
            };
        }
        default: return state;
    }
};