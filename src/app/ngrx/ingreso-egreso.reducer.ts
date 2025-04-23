import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';
import { UserInterface } from '../interfaces/user.interface';
import { setUser, unSetUser } from './auth.actions';
import { IngresoEgresoInterface } from '../interfaces/ingreso-egreso.interface';
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface State{
    items: IngresoEgresoInterface[];
}

export const initialState:State = {
    items: [],
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state,{items}) => ({...state, items: [...items]})),
  on(unSetItems, (state) => ({...state, items: []})),
);