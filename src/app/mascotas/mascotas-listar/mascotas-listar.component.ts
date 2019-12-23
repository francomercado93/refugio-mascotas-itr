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

  validateBtnState: Map<String, ClrLoadingState> = new Map()
  mascotas: Array<Mascota> = new Array()
  basic: boolean = false
  mascotaSeleccionada: Mascota

  constructor(private mascotasService: MascotasService) { }

  ngOnInit() {
    this.mascotasService.getMascotas().subscribe((data) => {
      this.mascotas = data
      this.mascotas.forEach((pet) => this.validateBtnState.set(pet._id, ClrLoadingState.DEFAULT))
      console.log(this.mascotas);
    })
  }

  hayMascotas(): boolean {
    return this.mascotas.length != 0
  }

  async delete() {
    let id = this.mascotaSeleccionada._id
    this.validateBtnState.set(id, ClrLoadingState.LOADING)
    // await delay(700);
    this.mascotasService.deleteMascota(id).subscribe((data) => {
      this.validateBtnState.set(id, ClrLoadingState.SUCCESS)
      this.deleteMascotaLocal(id)
      this.closeModal()
      console.log("Mascota eliminada de la base de datos!")
    })
  }

  private deleteMascotaLocal(id: String): void {
    this.mascotas.splice(this.mascotas.findIndex((pet) => pet._id == id), 1);
  }

  public getValidateBtnState(mascotaId: String): ClrLoadingState {
    return this.validateBtnState.get(mascotaId)
  }

  openModal(mascota: Mascota): void {
    this.mascotaSeleccionada = mascota
    this.basic = true
  }

  closeModal(): void {
    this.basic = false
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
