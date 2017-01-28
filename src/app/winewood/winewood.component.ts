import { Component, OnInit, OnDestroy, Renderer, ElementRef } from '@angular/core';

declare var d3: any;

@Component({
  selector: 'app-winewood',
  templateUrl: 'winewood.component.html',
  styleUrls: ['winewood.component.css']
})
export class WinewoodComponent implements OnInit, OnDestroy {
  private element : any;
  private dataset : Array<Object> = [];

  private full_width : number;
  private full_height : number;
  private margins : Object = {'top' : 0, 'bottom' : 0, 'left' : 0, 'right' : 0 };
  private width : number;
  private height : number;
  private redrawOnResize : Function;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  drawWinewood(): void{

    this.full_width = this.element.parentElement.parentElement.clientWidth;
    this.full_height = this.element.parentElement.parentElement.clientHeight;
    this.width = this.full_width - this.margins['top'] - this.margins['bottom'];
    this.height = this.full_height - this.margins['left'] - this.margins['right'];
    var h =  5, w =  10;
    var switched = true, blinking = false;

    for (let i=1; i<100;i++){
      for (let j=1;j<125;j++){
        this.dataset.push({'x' : i, 'y': j,});
      }
    }

    let x = d3.scaleLinear()
      .domain([0,100])
      .range([0,2500]);

    let y = d3.scaleLinear()
      .domain([0,100])
      .range([0,2500]);

    d3.select('.winewood').select('svg').remove();

    let svg = d3.select('.winewood').append('svg')
      .attr('height',2500)
      .attr('width',2500);

    svg.append('rect')
      .attr('width',2500)
      .attr('height',2500)
      .attr('fill','#1B223C');

    let domino = svg.selectAll('.domino')
      .data(this.dataset).enter()
      .append('g')
        .attr('class','domino')
        .attr('transform',function(d){ return 'translate(' + x(d.x) + ',' + y(d.y) + ')' })
        .attr('opacity',1);

    domino.append('path')
      .attr('d','M0 0 L0 ' + h + ' L' + w + ' -' + h +' L' + w + '-' + 2*h + ' Z')
      .attr('id',function(d,i){ return i })
      .attr('fill','#FD6069');

      //.attr('opacity',1);
      //.attr('class','blink_me');
      //.call(function(d,i) { (!blinking) ? (blink(switched), blinking = true) : false; });

    function blink(switched){
      (switched)
        ? d3.selectAll('.domino path').transition().delay(function(d,i){ return i*.1 }).duration(.5).attr('opacity',1)
        : d3.selectAll('.domino path').transition().delay(function(d,i){ return i*.1 }).duration(.5).attr('opacity',0);

      setTimeout(function(){
        switched = !switched;
        blink(switched);
      },1000)
    }
  }

  ngOnInit() {
    this.redrawOnResize = this.renderer.listenGlobal('window', 'resize', (event) => {
     //this.drawWinewood();
    });
    this.element =  d3.select('.winewood')._groups[0][0];
    this.drawWinewood();
  }

  ngOnDestroy(){

  }

}
