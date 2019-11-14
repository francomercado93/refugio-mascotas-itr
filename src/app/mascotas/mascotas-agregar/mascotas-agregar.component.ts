import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TipoAnimal } from '../shared/tipoAnimal';
import { MascotasService } from '../shared/mascotas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas-agregar',
  templateUrl: './mascotas-agregar.component.html',
  styleUrls: ['./mascotas-agregar.component.css']
})

export class MascotasAgregarComponent implements OnInit {

  tipoSeleccionado: TipoAnimal = null;
  tiposAnimales: TipoAnimal[]

  public mascotaForm = this.formBuilder.group({
    // TODO: agregar custom validator para que el usuario no pueda ingresar un nombre (o un conjunto de nombre) determinado
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]+')]],
    edad: ['', [Validators.required, Validators.min(0)]],
    tipo: ['', Validators.required],
    descripcion: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private mascotasService: MascotasService, private router: Router) { }

  ngOnInit() {
    this.mascotasService.getTiposAnimales().subscribe((data) => {
      this.tiposAnimales = data
      // Se ejecuta asincronicamente es decir cuando obtiene los datos, mientras que fuera del fetch se ejecuta sincronicamente, por eso no trae ningun dato
      // console.log(this.tiposAnimales)
    })
  }

  get nombre() { return this.mascotaForm.get('nombre') }

  get edad() { return this.mascotaForm.get('edad') }

  get descripcion() { return this.mascotaForm.get('descripcion') }

  onSubmit() {
    console.log(this.mascotaForm.value)
    this.mascotasService.addMascota(this.mascotaForm.value).subscribe(data => {
      this.navigateMascotasListar()
    })
  }

  private navigateMascotasListar() {
    this.router.navigate(['/mascotas-listar']);
  }

  reset() {
    this.mascotaForm.reset()
  }


}