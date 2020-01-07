import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrlApiHeroku } from './baseUrl';
import { Mascota } from './mascota';
import { TipoAnimal } from './tipoAnimal';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private httpClient: HttpClient) { }

  public getMascotas() {
    // Interpolacion de cadenas de texto (ES6) para crear cadenas de texto
    return this.httpClient.get<Array<Mascota>>(`${baseUrlApiHeroku}/mascotas`);
  }

  public getTiposAnimales() {
    return this.httpClient.get<Array<TipoAnimal>>(`${baseUrlApiHeroku}/tipos`)
  }

  public addMascota(mascota: Mascota) {
    return this.httpClient.post<Mascota>(`${baseUrlApiHeroku}/mascotas`, mascota)
  }

  public getMascota(id: String) {
    return this.httpClient.get<Mascota>(`${baseUrlApiHeroku}/mascotas/${id}`)
  }

  public updateMascota(mascota: Mascota) {
    return this.httpClient.put<Mascota>(`${baseUrlApiHeroku}/mascotas`, mascota)
  }

  public deleteMascota(idMascotaEliminar: String) {
    return this.httpClient.delete<Mascota>(`${baseUrlApiHeroku}/mascotas/${idMascotaEliminar}`)
  }
}
