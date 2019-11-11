import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-mascotas-agregar',
  templateUrl: './mascotas-agregar.component.html',
  styleUrls: ['./mascotas-agregar.component.css']
})

export class MascotasAgregarComponent implements OnInit {

  public mascotaForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', Validators.required, Validators.minLength(3)],
      edad: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],
      tipo: ['', Validators.required],
      descripcion: ['']
    })
  }

}
