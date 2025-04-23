import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { IngresoEgresoInterface } from '../interfaces/ingreso-egreso.interface';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  private fireStore = inject(Firestore);
  private authService = inject(AuthService);

  constructor() {}
  createIngresoEgreso(ingresoEgreso: IngresoEgresoInterface): Promise<any> {
    const uid = this.authService.getUser.uid;
    const collectionIngresoEgreso = collection(
      this.fireStore,
      `${uid}/ingreso-egreso/items`
    );
    const documentRef = doc(collectionIngresoEgreso);
    return setDoc(documentRef, { ...ingresoEgreso });
  }

  initIngresosEgresos(uid:string):Observable<any>{
    const docRef = doc(this.fireStore, `${uid}/ingreso-egreso`);
    const itemsRef = collection(docRef, 'items');
    return collectionData(itemsRef, {idField: 'uid'})
  }
  borrarIngresoEgreso(uidItem:string):Promise<void>{
    const uid = this.authService.getUser.uid;
    return deleteDoc(doc(this.fireStore, `${uid}/ingreso-egreso/items/${uidItem}`));

  }
}
