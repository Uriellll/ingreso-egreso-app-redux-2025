import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';
import { UserInterface } from '../interfaces/user.interface';
import { setUser, unSetUser } from './auth.actions';

export interface State{
    user: UserInterface;
}

export const initialState:State = {
    user: {uid: null, email: null, nombre: null},
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state,{user}) => ({...state, user: {...user}})),
  on(unSetUser, (state) => ({...state, user: {uid:null, email:null, nombre:null}})),
);