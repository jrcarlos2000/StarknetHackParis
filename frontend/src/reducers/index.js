import { combineReducers } from "redux";

const modalReducer = (openModal = '', action) => {
    if (action.type === 'OPEN_MODAL'){
        return action.payload;
    }
    return openModal;
 }

 export default combineReducers({
     openModal: modalReducer
 });