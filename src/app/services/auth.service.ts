import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private fireStore = inject(Firestore)

  constructor() { }
  initAuthListener():Observable<any>{
    return authState(this.auth)
  }
  createUser(nombre:string, email:string,password:string):Promise<any>{
    return createUserWithEmailAndPassword(this.auth,email,password)
    .then(({user}) =>{
      const newUser: UserInterface = {uid: user.uid, nombre, email: user.email}
      return setDoc(doc(this.fireStore, `${user.uid}`, "usuario"), newUser);
    })
  }
  signIn(email:string, password:string):Promise<any>{
    return signInWithEmailAndPassword(this.auth,email,password);
  }
  logOut():Promise<any>{
    return signOut(this.auth);
  }
  isAuth(){
    return authState(this.auth).pipe(
      map(fbUser => fbUser != null)
    )
  }
}
