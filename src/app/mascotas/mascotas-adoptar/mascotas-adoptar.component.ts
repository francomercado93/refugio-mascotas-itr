import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../shared/mascotas.service';
import { Mascota } from '../shared/mascota';
import { TipoAnimal } from '../shared/tipoAnimal';

@Component({
  selector: 'app-mascotas-adoptar',
  templateUrl: './mascotas-adoptar.component.html',
  styleUrls: ['./mascotas-adoptar.component.css']
})
export class MascotasAdoptarComponent implements OnInit {

  mascotas: Mascota[] = new Array()
  tiposAnimales: TipoAnimal[] = new Array()

  constructor(private mascotasService: MascotasService) { }

  ngOnInit() {
    this.mascotasService.getMascotas().subscribe((data) => {
      this.mascotas = data
    })
    this.mascotasService.getTiposAnimales().subscribe((data) => {
      this.tiposAnimales = data
    })
  }

  getMascotasPorTipo(tipo: string) {
    return this.mascotas.filter(mascota => mascota.tipo == tipo)
  }

  hayMascotas(tipo: string) {
    return this.getMascotasPorTipo(tipo).length != 0
  }

  isCat(nombre: string) {
    return nombre == "Gato"
  }

  existenTiposAnimales() {
    return this.tiposAnimales != null
  }

  hayAnimalesCargados() {
    return this.mascotas.length == 0
  }
}
