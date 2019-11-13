import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/mascotas/shared/mascotas.service';
import { Mascota } from '../shared/mascota';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-mascotas-listar',
  templateUrl: './mascotas-listar.component.html',
  styleUrls: ['./mascotas-listar.component.css']
})
export class MascotasListarComponent implements OnInit {

  validateBtnState: Map<number, ClrLoadingState> = new Map()
  mascotas: Array<Mascota> = null

  constructor(private mascotasService: MascotasService) { }

  ngOnInit() {
    this.mascotasService.getMascotas().subscribe((data) => {
      this.mascotas = data
      this.mascotas.forEach((pet) => this.validateBtnState.set(pet.id, ClrLoadingState.DEFAULT))
    })
  }

  hayMascotas() {
    return this.mascotas != null
  }

  async delete(id: number) {
    this.validateBtnState.set(id, ClrLoadingState.LOADING)
    await delay(700);
    this.mascotasService.deleteMascota(id).subscribe((data) => {
      this.validateBtnState.set(id, ClrLoadingState.SUCCESS)
      this.deleteMascotaLocal(id);
      console.log("Mascota eliminada de la base de datos!")
    })
  }

  private deleteMascotaLocal(id: number) {
    this.mascotas.splice(this.mascotas.findIndex((pet) => pet.id == id), 1);
  }

  public getValidateBtnState(mascotaId: number) {
    return this.validateBtnState.get(mascotaId)
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
