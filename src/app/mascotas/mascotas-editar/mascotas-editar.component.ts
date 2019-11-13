import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../shared/mascotas.service';
import { TipoAnimal } from '../shared/tipoAnimal';

@Component({
  selector: 'app-mascotas-editar',
  templateUrl: './mascotas-editar.component.html',
  styleUrls: ['./mascotas-editar.component.css']
})
export class MascotasEditarComponent implements OnInit {

  tiposAnimales: TipoAnimal[]

  public mascotaForm = this.formBuilder.group({
    // TODO: agregar custom validator para que el usuario no pueda ingresar un nombre (o un conjunto de nombre) determinado
    id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    edad: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],
    tipo: ['', Validators.required],
    descripcion: ['', Validators.required]
  })

  constructor(private route: ActivatedRoute,
    private router: Router, private mascotasService: MascotasService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mascotasService.getTiposAnimales().subscribe((data) => {
      this.tiposAnimales = data
    })

    let id = this.route.snapshot.paramMap.get('id')

    this.mascotasService.getMascota(id).subscribe((data) => {
      this.mascotaForm.setValue(data)
      console.log(this.mascotaForm.value)
    })
  }

  onSubmit() {
    // if (window.confirm("Estas seguro?")) {
    this.mascotasService.updateMascota(this.mascotaForm.value).subscribe(data => {
      this.navigateMascotasListar()
    })
    // }
  }

  navigateMascotasListar() {
    this.router.navigate(['/mascotas-listar']);
  }
}
