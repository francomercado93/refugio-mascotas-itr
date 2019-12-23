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
  alta: boolean = false
  status: number = 0

  public mascotaForm

  constructor(private route: ActivatedRoute,
    private router: Router,
    private mascotasService: MascotasService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setValidators();
    this.setMascotas();
    // Edicion de mascota
    const idMascota = this.route.snapshot.paramMap.get('id')
    console.log(idMascota)
    this.alta = idMascota == 'new'

    if (!this.alta) {
      this.mascotasService.getMascota(idMascota).subscribe((data) => {
        this.mascotaForm.setValue(data)
        console.log(this.mascotaForm.value)
      })
    }
  }

  private setMascotas() {
    this.mascotasService.getTiposAnimales().subscribe((data) => {
      this.tiposAnimales = data;
    });
  }

  private setValidators() {
    this.mascotaForm = this.formBuilder.group({
      // TODO: agregar custom validator para que el usuario no pueda ingresar un nombre (o un conjunto de nombre) determinado
      _id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]+')]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['']
    });
  }

  onSubmit() {
    if (!this.alta) {
      this.mascotasService.updateMascota(this.mascotaForm.value).subscribe(data => {
        this.navigateMascotasListar()
      })
    } else {
      this.mascotasService.addMascota(this.mascotaForm.value).subscribe(data => {
        this.navigateMascotasListar()
      })
    }
  }

  navigateMascotasListar() {
    this.router.navigate(['/mascotas-listar']);
  }

  resetForm() {
    if (!this.alta) {
      this.mascotasService.getMascota(this.idMascota).subscribe((data) => {
        this.mascotaForm.setValue(data)
        this.mascotaForm.markAsUntouched()
        console.log(this.mascotaForm.value)
      })
    } else {
      this.reset()
    }
  }

  reset() {
    this.mascotaForm.reset()
    this.setValidators()
    this.status = 0
  }

  get titulo() {
    if (!this.alta) {
      return "Editar mascota"
    }
    else {
      return "Agregar mascota para adopcion"
    }
  }
  get idMascota() {
    return this.mascotaForm.get('_id').value
  }

  get statusMascotaForm() {
    if (this.mascotaForm.get('nombre').value != '') {
      this.status = 20
    }
    if (this.mascotaForm.get('edad').value != '') {
      this.status += 20
    }
    if (this.mascotaForm.get('tipo').value != '') {
      this.status += 20
    }
    if (this.mascotaForm.get('descripcion').value != '') {
      this.status += 20
    }
    if (this.mascotaForm.get('imagen').value != '') {
      this.status += 20
    }
    return this.status
  }

  mascotaFormValid(): boolean {
    return this.mascotaForm.valid
  }
}
