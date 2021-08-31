import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  ingreso!: number;
  egresos!: number;

  cuantosIngresos!: number;
  cuantosEgresos!: number;

  subscription: Subscription = new Subscription()
  
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: SingleDataSet = [
    [0,0]
  ];

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this._store.select('ingresoEgreso')
    .subscribe(IngresoEgreso => {
      const INGRESO_EGRESO = IngresoEgreso.items;
      this.counterIngresoEgreso(INGRESO_EGRESO);
    } )

  }

  counterIngresoEgreso(items: IngresoEgreso[]){


     this.ingreso = 0;
     this.egresos = 0;
     this.cuantosEgresos = 0;
     this.cuantosIngresos = 0;

     items.forEach(item => {
       if(item.tipo === 'ingreso'){
         this.cuantosIngresos ++;
         this.ingreso += item.monto;
       }else{
        this.cuantosEgresos ++;
        this.egresos += item.monto;
       }
     })

    this.doughnutChartData = [this.ingreso, this.egresos] 
  }

}
