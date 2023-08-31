import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-rewards-chart',
  templateUrl: './rewards-chart.component.html',
  styleUrls: ['./rewards-chart.component.scss']
})
export class RewardsChartComponent implements OnInit {

  constructor() { }

  public chart: any;
  public labelData : Array<any>  = [];
  public dataSetData : Array<any> = [];
  
  durationList = [
    { value: "1", label: "This Year" },
    { value: "2", label: "This Month" },
    { value: "3", label: "This Week" },
  ];

  filterList = [
    { value: "1", label: "Individual" },
    { value: "2", label: "Cumulative" },
    // { value: "3", label: "Sold Drecs" },
    // { value: "4", label: "Generated Drecs" },
    // { value: "5", label: "Redeeed Drecs" },
    // { value: "6", label: "Average Price/Drec" },

  ];
 
  selectedFilter : string = "1";
  selectedDuration : string = "1";


  ngOnInit(): void {
    this.createChart();
    this.setChartData()
    // this.getChartData();
  }


  createChart(){
  
    this.chart = new Chart("MyChart2", {
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
            pointStyle:'circle',
            pointBackgroundColor: 'white',
            pointRadius:4,
            borderWidth:2,

            // borderDash:[5, 15]
          },
          
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins:{
          legend: {
            display: false,
            labels: {
              color: 'rgb(255, 99, 132)'
          }
          }
        },

        scales: {
          x:{
            border: {
              display: true,
              dash:[8, 4]
            },
            ticks:{
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
                    stepSize:100,

                    callback: function(value, index, ticks) {
                        return value+'W';
                    }
                }
            },
            
        }
    
      },
    
    });
  }

  setChartData(){

    this.labelData = ['Jan 22', 'Feb 22', 'Mar 22','Apr 22',
    'May 22', 'Jun 22', 'Jul 22','Aug 22',
    'Sep 22', 'Oct 22', 'Nov 22','Dec 22', ]
    this.dataSetData = [160, 160, 210, 250, 380, 360, 300, 400, 400, 501, 501, 400]
    this.updateChartData()

  }


  getChartData(){

      this.labelData = ['Jan 22', 'Feb 22', 'Mar 22','Apr 22',
      'May 22', 'Jun 22', 'Jul 22','Aug 22',
      'Sep 22', 'Oct 22', 'Nov 22','Dec 22', ]
      this.dataSetData = [160, 160, 210, 250, 380, 360, 300, 400, 400, 500, 500, 400]
      this.updateChartData()
    
  }

  updateChartData(){
    this.chart.data.labels = this.labelData
    this.chart.data.datasets[0].data = this.dataSetData
    this.chart.update();
  }
}
