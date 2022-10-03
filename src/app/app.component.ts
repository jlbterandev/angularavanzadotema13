import { Component, OnInit } from '@angular/core';

import { SwPush, SwUpdate } from '@angular/service-worker';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit
{
  title = 'Ejercicio1';
  frase: string = '';

  readonly PUBLIC_VAPID_KEY =  'BGMHrsaxlagCaajXMhJUc94bFKgBLcTLFRxcYsDCKGMfyj2eEt-8DuzYmQdOQngAoRGCiBt0ZOLUqbwvvBgXSh8';

  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private dataService: DataService)
  {

  }

  ngOnInit(): void
  {
    this.reloadCache();
  }

  reloadCache()
  {
    if(this.swUpdate.isEnabled)
    {
      this.swUpdate.available.subscribe((event) =>
      {
        if(confirm('Existe una nueva versión de la aplicación, ¿Deseas descargarla?'))
        {
          this.swUpdate.activateUpdate().then(() => window.location.reload());
        }
      });
    }
  }

  nuevaFrase()
  {
    this.dataService.obtenerFraseAleatoria().subscribe((response) => { this.frase = response.value });
  }

  suscripcionNewsletter()
  {
    console.log('SOLICITMOS NOTIFICACION PUSH AL SERVIDOR');
    if(this.swUpdate.isEnabled)
    {
      this.swPush.requestSubscription({ serverPublicKey: this.PUBLIC_VAPID_KEY }).then((sub) =>
      {
        this.dataService.suscribirnos(sub).subscribe();
      })
    }
  }
}
