import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MascotasCardComponent } from './mascotas/mascotas-card/mascotas-card.component';
import { FirstLetterUpperCasePipe } from './mascotas/shared/firstLetterUpperCase.pipe';
import { MascotasService } from './mascotas/shared/mascotas.service';
import { MascotasNotFoundComponent } from './mascotas/mascotas-not-found/mascotas-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FirstLetterUpperCasePipe,
    MascotasCardComponent,
    MascotasNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // Si no se declara aca cada vez que llama desde un componente se contruye una nueva instancia del service
  providers: [MascotasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
