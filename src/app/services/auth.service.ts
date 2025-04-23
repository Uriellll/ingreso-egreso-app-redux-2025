import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducer';
import * as authActions from '../ngrx/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ngrx/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private fireStore = inject(Firestore);
  private store = inject(Store<AppState>);
  private userSubs!: Subscription;
  private user!: UserInterface;

  constructor() {}
  get getUser() {
    return this.user;
  }
  initAuthListener() {
    authState(this.auth).subscribe((fuser) => {
      if (fuser) {
        const userDocRef = doc(this.fireStore, `${fuser.uid}`, 'usuario');
        //unsubscribe debido a que se está conectado a socket de firebase
        this.userSubs = docData(userDocRef).subscribe((docUser: any) => {
          const user: UserInterface = {
            uid: docUser.uid,
            nombre: docUser.nombre,
            email: docUser.email,
          };
          this.user = user;
          this.store.dispatch(authActions.setUser({ user }));
        });
      } else {
        this.user = { uid: null, nombre: null, email: null };
        this.userSubs.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());
      }
    });
    return authState(this.auth);
  }
  createUser(nombre: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser: UserInterface = {
          uid: user.uid,
          nombre,
          email: user.email,
        };
        return setDoc(doc(this.fireStore, `${user.uid}`, 'usuario'), newUser);
      }
    );
  }
  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logOut(): Promise<any> {
    return signOut(this.auth);
  }
  isAuth() {
    return authState(this.auth).pipe(map((fbUser) => fbUser != null));
  }
}
