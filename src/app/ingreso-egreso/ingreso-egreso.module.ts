import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromIgresoEgresoReducer from '../ingreso-egreso/ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticasComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', fromIgresoEgresoReducer.reducer)
  ],
})
export class IngresoEgresoModule { }
