import { combineReducers } from 'redux';
import { authorization } from './Authorization/reducers';
import admin from './Admin/reducers';

export default combineReducers({
    authorization,
    admin
});