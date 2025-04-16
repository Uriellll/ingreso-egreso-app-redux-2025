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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private fireStore = inject(Firestore);
  private store = inject(Store<AppState>);
  private userSubs!: Subscription;

  constructor() {}
  initAuthListener() {
    authState(this.auth).subscribe((fuser) => {
      console.log(fuser);
      if (fuser) {
        const userDocRef = doc(this.fireStore, `${fuser.uid}`, 'usuario');
        //unsubscribe debido a que se está conectado a socket de firebase
        this.userSubs = docData(userDocRef).subscribe((docUser: any) => {
          const user: UserInterface = {
            uid: docUser.uid,
            nombre: docUser.nombre,
            email: docUser.email,
          };
          this.store.dispatch(authActions.setUser({user}));
        });
      } else {
        this.userSubs.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
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
