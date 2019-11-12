import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './baseUrl';
import { Mascota } from './mascota';
import { TipoAnimal } from './tipoAnimal';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private httpClient: HttpClient) { }

  public getMascotas() {
    // Interpolacion de cadenas de texto (ES6) para crear cadenas de texto
    return this.httpClient.get<Array<Mascota>>(`${baseUrl}` + "mascotas");
  }

  public getTiposAnimales() {
    return this.httpClient.get<Array<TipoAnimal>>(`${baseUrl}` + "tipos")
  }


  public addMascota(mascota: Mascota) {
    return this.httpClient.post<Mascota>(`${baseUrl}` + "mascotas", mascota)
  }
}
