
import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../interfaces/user.interface';

export const setUser = createAction('[Auth] setUser', props<{user:UserInterface}>());
export const unSetUser = createAction('[Auth] unSetUser');