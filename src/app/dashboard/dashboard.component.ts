import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs-3.2.7/canvasjs.min';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date:any=new Date()
  constructor() { }

  ngOnInit(): void {
    this.congestionGraph()
  }


  congestionGraph() {

    var chart = new CanvasJS.Chart("line", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: ""
      },
      data: [{        
        type: "line",
        indexLabelFontSize: 12,
        dataPoints: [
          { x:0,y: 0 },
          { x:20,y: 470 },
          { x:30,y: 490 },
          { x:40,y: 500 },
          { x:50,y: 550 },
          { x:60,y: 600 },
          { x:70,y: 650 },

          // { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
        
        ]
      }]
    });
    chart.render();
    
    }
}
