import { Component ,   ElementRef,   ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
  * 'plug into' DOM canvas element using @ViewChild 
  */
  @ViewChild('canvas') canvasEl : ElementRef;
  
  
  /**
  * Reference Canvas object 
  */
  private _CANVAS  : any;
  
  
  
  /**
    * Reference the context for the Canvas element 
    */
     private _CONTEXT : any;
     private _dimensions = {
      width : 600,
      height: 600
     }
     private _axis ={
       x:{
        thick : 10
       },
       y:{
        thick : 10
       }

     }

     public serie =[
      [5,5],
      [8,5],
      [10,12],
      [15,15],
      [17,25],
      [20,32],
      [25,10],
      [30,5]
     ]

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() 
  {
     this._CANVAS 	    = this.canvasEl.nativeElement;
     this._CANVAS.width  	= this._dimensions.width;
     this._CANVAS.height 	= this._dimensions.height;
  
     this.initialiseCanvas();
     this.drawCircle();
     console.log(this._CANVAS.height);
  }

  initialiseCanvas()
  {
     if(this._CANVAS.getContext)
     {
        this.setupCanvas();
     }
  }

  setupCanvas()
  {
     this._CONTEXT = this._CANVAS.getContext('2d');
     this._CONTEXT.fillStyle = "#3e3e3e";
     this._CONTEXT.fillRect(0, 0, this._dimensions.width, this._dimensions.height);
  }

  clearCanvas()
  {
     this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
     this.setupCanvas();
  }

  drawCircle()
  {
     this.clearCanvas();
     this._CONTEXT.beginPath();
  
     // x, y, radius, startAngle, endAngle
     this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 80, 0, 2 * Math.PI);      
     this._CONTEXT.lineWidth = 1;
     this._CONTEXT.strokeStyle = '#ffffff';
     this._CONTEXT.stroke();
  }

  probar(){
    console.log('probando');

    console.log(this._CANVAS.height);
    this._CONTEXT.beginPath();
    this._CONTEXT.moveTo(this.getX(10),this.getY(10-5));
    this._CONTEXT.lineTo(this.getX(8),this.getY(14-5));
    this._CONTEXT.lineTo(this.getX(12),this.getY(14-5));
    this._CONTEXT.lineTo(this.getX(10),this.getY(10-5));
    this._CONTEXT.lineTo(this.getX(10),this.getY(90));
    this._CONTEXT.lineTo(this.getX(90+5),this.getY(90));
    this._CONTEXT.lineTo(this.getX(86+5),this.getY(88));
    this._CONTEXT.lineTo(this.getX(86+5),this.getY(92));
    this._CONTEXT.lineTo(this.getX(90+5),this.getY(90));
    this._CONTEXT.lineWidth = 1;
    this._CONTEXT.strokeStyle = '#ffffff';


    this._CONTEXT.stroke();

    console.log('y axis');

    this.axisY(0,this._axis.y.thick,10);

    console.log('x axis');

    this.axisX(0,this._axis.x.thick,10);
    console.log('serie');

    this.drawSerie(this.serie,[0,0],[this._axis.x.thick,this._axis.y.thick],10);

  }

  getX(x){
    console.log('get x ' + x+ ' ' + ((x*this._dimensions.width)/100));
    return (x*this._dimensions.width)/100;
  }
  getY(y){
    console.log('get y ' + y+ ' ' + ((y*this._dimensions.height)/100));
    return (y*this._dimensions.height)/100;

  }

  drawSerie(serie,init,thick,divisions?){

    console.log('serie');

    this._CONTEXT.beginPath();
    this._CONTEXT.moveTo(this.getX(10),this.getY(90));
    for (var point of  serie) {
      console.log(point); //                                                                   v    ojo!! hay que tener en cuenta que eje Y esta invertido
    this._CONTEXT.lineTo(this.getX(this.translateCoord(point[0],divisions,thick[0])),this.getY(90-this.translateCoord(point[1],divisions,thick[1])));
    }
    this._CONTEXT.lineWidth = 1;
    this._CONTEXT.strokeStyle = '#ffffff';
    this._CONTEXT.stroke();

  }

  translateCoord(xy,divisions,thick){
    console.log('translating coord: ' + xy + ' with '+ divisions + ' divisions of ' + thick);
    let space = 85/(divisions-2);
    console.log((xy+10)*space/thick);
    return (xy+10)*space/thick;

  }

  axisY(init,thick,points?){
    let space = 85/(points-2);
    for (var index = 0; index < (points-1); index++) {
      this._CONTEXT.font = "1em Arial";
      this._CONTEXT.fillStyle = 'white';
      this._CONTEXT.textAlign = "center";
      this._CONTEXT.fillText((init+thick*index)+'',this.getX(5),this.getY(90+1 - space*index));
      
    }

  }

  axisX(init,thick,points?){
    let space = 85/(points-2);
    for (var index = 0; index < (points-1); index++) {
      this._CONTEXT.font = "1em Arial";
      this._CONTEXT.fillStyle = 'white';
      this._CONTEXT.textAlign = "center";
      this._CONTEXT.fillText((init+thick*index)+'',this.getX(10 + space*index),this.getY(95));
      
    }

  }

}
