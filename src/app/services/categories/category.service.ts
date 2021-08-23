import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  // Obtener categoria de Base de datos
  getCategories() {
    return this.db.list('/categories/',
      query => query.orderByChild('name')).snapshotChanges().pipe(map(actions =>
        actions.map(a => ({
          key: a.payload.key, ...(a.payload.val() as {})
        }))
      ));
  }
  setCategories(product) {
    return this.db.list('/categories').push(product);
  }


}
