import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../../core/services/dashboard.service'

@Component({
  selector: 'app-energy-consumprion-chart',
  templateUrl: './energy-consumprion-chart.component.html',
  styleUrls: ['./energy-consumprion-chart.component.scss']
})
export class EnergyConsumprionChartComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  public chart: any;
  public labelData: Array<any> = [];
  public dataSetData: Array<any> = [];
  interval: any;

  durationList = [
    { value: "1", label: "This Year" },
    { value: "2", label: "This Month" },
    { value: "3", label: "This Week" },
  ];

  filterList = [
    { value: "1", label: "My Consumption" },
    { value: "2", label: "My Energy Offset" },
  ];

  selectedFilter: string = "1";
  selectedDuration: string = "1";


  ngOnInit(): void {
    this.createChart();
    this.updateChartData();

    this.setChartData();

    // this.getChartData();

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointStyle: 'circle',
            pointBackgroundColor: 'white',
            pointRadius: 4,
            borderWidth: 2,
          },

        ]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          }
        },

        scales: {
          x: {
            border: {
              display: true,
              dash:[8, 4]
            },
            ticks: {
              padding: 10
            }
          },
          y: {
            border: {
              display: true,
              dash:[8, 4]
            },
            ticks: {
              padding: 10,
              stepSize: 100,
              callback: function (value, index, ticks) {
                return value + 'mWh';
              }
            }
          },

        }

      },

    });
  }

  setChartData() {

    this.labelData = ['Jan 22', 'Feb 22', 'Mar 22', 'Apr 22',
      'May 22', 'Jun 22', 'Jul 22', 'Aug 22',
      'Sep 22', 'Oct 22', 'Nov 22', 'Dec 22',]
    this.dataSetData = [160, 160, 210, 250, 380, 360, 300, 400, 400, 501, 501, 400]
    this.updateChartData()
    // let value = 100;
    // let c = 1

    // this.interval = setInterval(() => {
    //   // this.dashboardService.sendData({'time': Date.now(), 'value': value})

    //   if(this.labelData.length > 11){
    //     this.labelData.shift()
    //     this.dataSetData.shift()
    //   }

    //   this.labelData.push(new Date().toLocaleDateString('en-us', { year:"numeric", month:"short" })
    //   );
    //   this.dataSetData.push(value)

    //   this.updateChartData()

    //   if(c == 1){
    //     value += 100
    //     c += 1
    //   }
    //   else if(c == 2){
    //     value += 20
    //     c += 1
    //   }
    //   else if(c == 3){
    //     value += 50
    //     c += 1
    //   }
    //   else if(c == 4){
    //     value -= 130
    //     c = 1
    //   }

    //   if(value > 500){
    //     value = 100
    //   }


    // }, 3000);

  }

  getChartData() {

    //  this.dashboardService.getData().subscribe((response)=>{
    //   console.log("response: ", response);
    // })

    this.labelData = ['Jan 22', 'Feb 22', 'Mar 22', 'Apr 22',
      'May 22', 'Jun 22', 'Jul 22', 'Aug 22',
      'Sep 22', 'Oct 22', 'Nov 22', 'Dec 22',]
    this.dataSetData = [160, 160, 210, 250, 380, 360, 300, 400, 400, 500, 500, 400]
    this.updateChartData()

  }

  updateChartData() {
    this.chart.data.labels = this.labelData
    this.chart.data.datasets[0].data = this.dataSetData
    this.chart.update();
  }

}
