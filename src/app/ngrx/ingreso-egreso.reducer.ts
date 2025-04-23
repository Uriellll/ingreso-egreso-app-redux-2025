import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';
import { UserInterface } from '../interfaces/user.interface';
import { setUser, unSetUser } from './auth.actions';
import { IngresoEgresoInterface } from '../interfaces/ingreso-egreso.interface';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { AppState } from './app.reducer';

export interface State{
    items: IngresoEgresoInterface[];
}
//Se hizo uya  que ingreso egreso se carga mediante lazy load y necesitas la referencia
//para que el editor de texto detecte que exite ese reducer
export interface AppStateWithIngreso extends AppState{
    ingresosEgresos: State
}

export const initialState:State = {
    items: [],
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state,{items}) => ({...state, items: [...items]})),
  on(unSetItems, (state) => ({...state, items: []})),
);