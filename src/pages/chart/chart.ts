import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AwsMobilProvider } from '../../providers/aws-mobil/aws-mobil';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // ***
 // from https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/
 // ***

@IonicPage()
@Component({
    selector: 'page-chart',
    templateUrl: 'chart.html',
})
export class ChartPage {

    //@ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    //@ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    func: any;
 
    constructor(
        public navCtrl: NavController,
        private awsMobileProvider: AwsMobilProvider,
        private navParams: NavParams) {
        
        this.func = navParams.get('func');

        console.log("this.func", this.func)
            
    }
 
    ionViewDidLoad() {
 
        // this.barChart = new Chart(this.barCanvas.nativeElement, {
 
        //     type: 'bar',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255,99,132,1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        //             }]
        //         }
        //     }
 
        // });
 
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: '# of Votes',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.9)',
                        'rgba(54, 162, 235, 0.9)',
                        'rgba(255, 206, 86, 0.9)',
                        'rgba(75, 192, 192, 0.9)',
                        'rgba(153, 102, 255, 0.9)',
                        'rgba(255, 159, 64, 0.9)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
 
        });
 
        // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
        //     type: 'line',
        //     data: {
        //         labels: ["January", "February", "March", "April", "May", "June", "July"],
        //         datasets: [
        //             {
        //                 label: "My First dataset",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: "rgba(75,192,192,0.4)",
        //                 borderColor: "rgba(75,192,192,1)",
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: "rgba(75,192,192,1)",
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [65, 59, 80, 81, 56, 55, 40],
        //                 spanGaps: false,
        //             }
        //         ]
        //     }
 
        // });

        this.load();
 
    }

    load() {
        this.func.subscribe(result => {

            result.forEach(element => {
                this.doughnutChart.data.datasets[0].data.push(element.data) ;
                this.doughnutChart.data.labels.push(element.labels) ;
            });
            
            console.log(this.doughnutChart.data.datasets[0].data);
            this.doughnutChart.update();
        });
        
    }

}