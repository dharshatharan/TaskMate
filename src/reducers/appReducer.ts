'use strict';
import {setStoreState} from '@actions/appActions';
import {createReducer} from 'typesafe-actions';
import {AppAction} from '@actions/actionTypes';

export interface AppReducerState {
  version: string;
}

const initialState: AppReducerState = {
  version: '1.0.0',
};

const appReducer = createReducer<AppReducerState, AppAction>(
  initialState,
).handleAction(setStoreState, (state, action) =>
  Object.assign({}, initialState, state, action.payload),
);

export default appReducer;