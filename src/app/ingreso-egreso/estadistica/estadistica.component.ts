import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgresoInterface } from '../../interfaces/ingreso-egreso.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppStateWithIngreso } from '../../ngrx/ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, BaseChartDirective],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.scss',
})
export default class EstadisticaComponent implements OnInit, OnDestroy {
  store = inject(Store<AppStateWithIngreso>);
  ingresosEgresos: IngresoEgresoInterface[] = [];
  ingresos!: number;
  egresos!: number;
  ingresosLength!: number;
  egresosLength!: number;
  detalleSubs!: Subscription;
  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
  doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  doughnutChartType: ChartType = 'doughnut';

  ngOnDestroy(): void {
    this.detalleSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.detalleSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresos = 0;
        this.egresos = 0;
        this.ingresosLength = 0;
        this.egresosLength = 0;
        this.ingresosEgresos = items;
        this.ingresosEgresos.forEach((data) => {
          if (data.tipo === 'egreso') {
            this.egresos = this.egresos + data.monto;
            this.egresosLength++;
          } else {
            this.ingresos = this.ingresos + data.monto;
            this.ingresosLength++;
          }
        });
        this.doughnutChartData.datasets = [
          { data: [this.ingresos, this.egresos] },
        ];
      });
  }
}
