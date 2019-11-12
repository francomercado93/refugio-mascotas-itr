import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/mascotas/shared/mascotas.service';
import { Mascota } from '../shared/mascota';

@Component({
  selector: 'app-mascotas-listar',
  templateUrl: './mascotas-listar.component.html',
  styleUrls: ['./mascotas-listar.component.css']
})
export class MascotasListarComponent implements OnInit {

  mascotas: Array<Mascota> = null

  constructor(private mascotasService: MascotasService) { }

  ngOnInit() {
    this.mascotasService.getMascotas().subscribe((data) => {
      this.mascotas = data
    })
  }

  hayMascotas() {
    return this.mascotas != null
  }

}
