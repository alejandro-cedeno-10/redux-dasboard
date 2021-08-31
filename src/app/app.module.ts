import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component'; */
/* import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticasComponent } from './ingreso-egreso/estadisticas/estadisticas.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
 *//* import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component'; */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreModule } from '@ngrx/store';
import { APP_REDUCERS } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/* import { OrdenIngresoEgresoPipe } from './ingreso-egreso/orden-ingreso-egreso.pipe'; */
import { ChartsModule } from 'ng2-charts';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';

@NgModule({
  declarations: [
    AppComponent,
  /*   LoginComponent,
    RegisterComponent, */
   /*  DashboardComponent,
    IngresoEgresoComponent, */
  /*   EstadisticasComponent,
    DetalleComponent, */
 /*    FooterComponent,
    NavbarComponent,
    SidebarComponent, */
   /*  OrdenIngresoEgresoPipe, */
  ],
  imports: [
    BrowserModule,
    AuthModule,
    /* IngresoEgresoModule, */
    AppRoutingModule,
    /* FormsModule, */
    AngularFireModule.initializeApp(environment.firebase),
   /*  AngularFirestoreModule, */

    StoreModule.forRoot(APP_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production
    }),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
