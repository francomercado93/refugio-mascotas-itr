import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MascotasEditarComponent } from './mascotas/mascotas-editar/mascotas-editar.component';
import { MascotasListarComponent } from './mascotas/mascotas-listar/mascotas-listar.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { MascotasAdoptarComponent } from './mascotas/mascotas-adoptar/mascotas-adoptar.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'mascotas-adoptar', component: MascotasAdoptarComponent },
  { path: 'mascotas-listar', component: MascotasListarComponent },
  { path: 'mascotas-editar/:id', component: MascotasEditarComponent },
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [InicioComponent, MascotasListarComponent, MascotasEditarComponent, PageNotFoundComponent, MascotasAdoptarComponent] 
