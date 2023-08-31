import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-energy-offset-statistics-chart',
  templateUrl: './energy-offset-statistics-chart.component.html',
  styleUrls: ['./energy-offset-statistics-chart.component.scss']
})
export class EnergyOffsetStatisticsChartComponent implements OnInit {

  constructor() { }

  public chart: any;
  public drecsOwned : number = 0;
  public drecsStacked : number = 0;

  ngOnInit(): void {
    this.createChart();
    this.getChartData();
  }

  createChart(){
  
    this.chart = new Chart("MyChart3", {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        labels: [
          'DRECs Owned',
          'DRECs Staked',
        ],
        datasets: [{
          data: [this.drecsOwned, this.drecsStacked,],
          backgroundColor: [
            'rgb(75, 192, 192)',
            'blue',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2,
        plugins:{
          legend: {
            display: false,
          }
        },
      },
    });
  }


  getChartData(){
    this.drecsOwned = 2374;
    this.drecsStacked = 1187;

    this.updateChartData()
  
}

updateChartData(){
  this.chart.data.datasets[0].data = [this.drecsOwned, this.drecsStacked,]
  this.chart.update();
}
}
