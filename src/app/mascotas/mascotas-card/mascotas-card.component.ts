import { Component, OnInit, Input } from '@angular/core';
import { Mascota } from '../shared/mascota';

@Component({
  selector: 'app-mascotas-card',
  templateUrl: './mascotas-card.component.html',
  styleUrls: ['./mascotas-card.component.css']
})
export class MascotasCardComponent implements OnInit {

  @Input() mascota: Mascota

  constructor() { }

  ngOnInit() {
  }

  getEdadMascota(edad: number) {
    var anios = "Año"
    if (edad > 1) {
      anios = anios.concat("s")
    }
    return edad.toString().concat(" " + anios)
  }
  noImg(mascota: Mascota) {
    return mascota.imagen == null || mascota.imagen == ''
  }
}
