import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService
{
  constructor(private http: HttpClient)
  {

  }

  obtenerFraseAleatoria(): Observable<any>
  {
    return this.http.get('https://api.chucknorris.io/jokes/random');
  }

  suscribirnos(push: PushSubscription)
  {
    const url = 'http://localhost:3000/suscripcion';
    console.log("REALIZAMOS PETICION AL SERVIDOR DE NOTIFICACIONES PUSH");
    return this.http.post(url, push);
  }
}
