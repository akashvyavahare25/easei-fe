import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import * as Highcharts from 'highcharts/highcharts.src';
import highcharts3D from 'highcharts/highcharts-3d.src'
highcharts3D(Highcharts);
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  graph: any = []
  graph3:any={data: [],layout:{}}
  graph4:any={data: [],layout:{}}
  graph1: any = { data: [],layout:{},}
  graph2: any = { data: [],layout:{},config:{}}
  graph5:any={data: [],layout:{}}
  alpha:boolean=false
  label:string[] =["a","b","c","d","e","f"]
  highcharts = Highcharts;
  highcharts1 = Highcharts;
  chartOptions1:any
  chartOptions:any
  chartOptions3:any
  chartOptions2:any
  chartOptions4:any
  constructor(   
     private route: ActivatedRoute,
     private router: Router,
    ) { 
    this.route.params.subscribe(params => {
      if(params.dashboard==="alpha"){
        this.alpha=true
      }
      else{
        this.alpha=false
      }
    })}

  ngOnInit(): void {
    this.chartOptions = {   
      chart : {
         type:'pie',
         options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
         }
      },
      title : {
         text: 'No of Claim paid by year '   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 45,
            dataLabels: {
               enabled: true,
               format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
              // distance: 0
              //  style: {
              //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
              //     'black'
              //  }
            },
            showInLegend: true
         }
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      },
      series : [{
         type: 'pie',
         name: 'Claim Paid',
         data: [
            ['2019',  1891],
            ['2020',  293],            
            ['2018',    167],
            ['2017',     22],
            ['2016',      7],
            ['2015',1]
         ]
      }]
   };
   this.chartOptions1 = {   
    chart : {
       type:'pie',
       options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
       }
    },
    title : {
       text: 'No of Claim Paid by Claim status'   
    },
    tooltip : {
       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
       pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          dataLabels: {
             enabled: true,
             format: '<b>{point.name}%  </b>: {point.percentage:.1f} %',
            // distance: 0,
            //  style: {
            //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
            //     'black'
            //  }
          },
          showInLegend: true
       }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    responsive: {
      rules: [{
          condition: {
              maxWidth: 558
          },
          chartOptions: {
              legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
              }
          }
      }]
  },
    series : [{
       type: 'pie',
       name: 'Claim Paid',
       data: [
          ['Pending',  1310],
          ['Approved',  741],            
          ['Yet to review',    267],
          ['Cancelled',     87],
       ]
    }]
 };
 this.chartOptions2 = {   
  chart : {
     type:'pie',
     options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
     }
  },
  title : {
     text: 'No of Claim paid by Nationality'   
  },
  tooltip : {
     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions : {
     pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
           enabled: true,
           format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
           distance: 5
          //  style: {
          //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
          //     'black'
          //  }
        },
        showInLegend: true
     }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  series : [{
     type: 'pie',
     name: 'Claim Paid',
     data: [
        ['N/A',  1314],
        ['MALWAIN',  615],            
        ['NULL',    428],
        ['BRITISH',     22],
        ['INDIAN',      15],
        ['UROPAIN',17],
        ['TANZANIA',10],
        ['AFRIACA',2],
        ['AMERICAN',1]
     ]
  }]
};
this.chartOptions3 = {   
  chart : {
     type:'pie',
     options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
     }
  },
  title : {
     text: 'No of Claim paid by Vehical Usage'   
  },
  tooltip : {
     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions : {
     pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 45,
        dataLabels: {
           enabled: true,
           format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
          //  style: {
          //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
          //     'black'
          //  }
        },
        showInLegend: true
     }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  series : [{
     type: 'pie',
     name: 'Claim Paid',
     data: [
        ['Private Usage',  1185],
        ['Own Goods',  303],            
        ['NULL',    228],
        ['Hier & Reward',     28],
        ['General',      15],
        ['Special T',10],
        ['Taxi Cap',5],
        ['Staff Buss',5],
     ]
  }]
};
this.chartOptions4 = {   
  chart : {
     type:'pie',
     options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
     }
  },
  title : {
     text: 'No of Claim paid by Vehical Type'   
  },
  tooltip : {
     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions : {
     pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 55,
        dataLabels: {
           enabled: true,
           format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
          //  style: {
          //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
          //     'black'
          //  }
        },
        showInLegend: true
     }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  series : [{
     type: 'pie',
     name: 'Claim Paid',
     data: [
        ['Saloon',  1105],
        ['Station W..',  408],            
        //['NULL',    309],
        ['Pickup',     135],
        ['Horse',      36],
        ['Trailer',28],
        ['Mini Bus',24],
        ['Lorry',20],
        ['Van',13]
     ]
  }]
};
    this.graph=[]
    this.graph1={ data: [],layout:{},}
    var trace1 = {
      x: ['<15', '16-30', '31-100','100-365','>365'],
      y: [243,217,745,407,6],
      text:[243,217,745,407,6].map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      type: 'bar',
      marker: {
        color: 'rgb(49,130,189)',
        opacity: 0.5
      }
    };
    
    var trace2 = {
      x: ['Russia', 'Malawian', 'BRITISH', 'INDIAN', 'UROPAIN', 'TANZANIA', 'AFRIACA', 'AMERICAN',],
      y:[1314,915,400,150,107,90,72,51],        
      mode: 'lines+markers+text',
      type: 'scatter',
      name: 'spline',
      text:['1314','915','400','150','107','90','72','51'],
      //textposition: 'auto',
      textposition: 'bottom center',
      hoverinfo: 'none',
      //text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
      line: {shape: 'spline'},
      
    };
    
    var trace3 = {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      y:[50,44,40,102,93,93,92,79,78,74,61,51] ,
      mode: 'lines+markers+text',
      type: 'scatter',
      name: 'spline',
      text:['50','44','40','102','93','93','92','79','78','74','61','51'],
      //textposition: 'auto',
      textposition: 'bottom center',
      hoverinfo: 'none',
      //text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
      line: {shape: 'spline'},
    };
    var trace5 = {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      y: [20, 14, 25, 16, 18, 22, 19, 15, 12, 16, 14, 17],
      type: 'bar',
      name: 'Primary Product',
      text:[20, 14, 25, 16, 18, 22, 19, 15, 12, 16, 14, 17].map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(49,130,189)',
        opacity: 0.7,
      }
    };
    
    var trace6 = {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      y: [0.50,0.37,0.10,0.78,0.85,0.66,0.89,0.80,0.88,0.69,0.59,0.43],
      type: 'bar',
      text: [0.50,0.37,0.10,0.78,0.85,0.66,0.89,0.80,0.88,0.69,0.59,0.43].map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      name: 'Secondary Product',
      marker: {
        color: 'rgb(49,130,189)',
        opacity: 0.5
      }
    };
    var trace9 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      name: 'SF Zoo',
      type: 'bar'
    };
    
    var trace10 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [12, 18, 29],
      name: 'LA Zoo',
      type: 'bar'
    };
    
    var trace4 = {
      x: [4000, 5000, 6000],
      y: [7000, 8000, 9000],
      xaxis: 'x4',
      yaxis: 'y4',
      type: 'scatter'
    };
    
      this.graph[0]={data: [trace1],
      layout :{
        title: 'No of Claim Settled by Days',
        barmode: 'group'
      }
      }
      this.graph[1]={data:[trace6],layout:{
        title: 'Average Value per Claim',
        xaxis: {
          tickangle: -45
        },
        barmode: 'group'
      }    
    }
    this.graph1.data=[trace3]
    this.graph1.layout={
    //   xaxis: {title:"Age"},
    // yaxis: {
    //   title: 'Hours',
    // },
    title:"Average Value per Claim"
    }        
  
       
      var trace7 = {
        values: [1310, 741, 267,87],
        labels: ['P','Y','A','C'],
        type: 'pie'
      };
      
      var trace8 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter'
      };
      this.graph3.data=[trace7]
      this.graph2.data=[trace2]
      this.graph2.layout={
        title:'No of Claims paid by Nationality'
      }
      this.graph2.config={responsive:true}
      // this.graph2.layout={height: 300,
      //   width: 300} 
      this.graph4.data=[trace7] 
      this.graph4.layout={title:'No of Claims Paid by Claim Status'} 
      this.graph4.config={responsive:true}
      this.graph5.data=[trace4] 
    }


}
