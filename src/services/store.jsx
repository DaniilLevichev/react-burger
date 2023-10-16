import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {rootReducer} from './reducers/index'

export const store = configureStore({
    reducer: rootReducer
});