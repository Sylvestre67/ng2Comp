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
    var h =  this.height/ 4, w =  this.width/ 9;

    for (var i=0; i<100;i++){
      this.dataset.push({'first' : 1, 'second': 5, 'third': 3, 'fourth': 7, 'y' : i});
    }

    let x = d3.scaleLinear()
      .domain([0,4])
      .range([0,this.width]);

    let y = d3.scaleLinear()
      .domain([0,3])
      .range([0,this.height]);

    d3.select('.winewood').select('svg').remove();

    let svg = d3.select('.winewood').append('svg')
      .attr('height',this.full_height)
      .attr('width',this.full_width);

    var background = svg.append('rect')
      .attr('width',this.width)
      .attr('height',this.height)
      .attr('fill','#1B223C');

    var chart = svg.append('g')
      .attr('transform','translate(' + this.margins['left'] + ',' + this.margins['top'] + ')');

    var elements = chart.selectAll('g')
      .data(this.dataset).enter()
      .append('g')
      .attr('class','line')
      .attr('transform',function(d,i){ return 'translate(' + 0 + ',' + y(d.y)   + ')'});

    elements.append('g')
      .attr('transform',function(d,i){ return 'translate(' + d.first * w + ',' + 0 + ')'})
      .append('path')
      .attr('d','M0 0 L0 ' + h + ' L' + w + ' -' + h +' L' + w + '-' + 2*h + ' Z')
      .attr('fill','#FD6069');

    elements.append('g')
      .attr('transform',function(d,i){ return 'translate(' + d.second * w + ',' + 0 + ')'})
      .append('path')
      .attr('d','M0 0 L0 ' + h + ' L' + w + ' -' + h +' L' + w + '-' + 2*h + ' Z')
      .attr('fill','#FD6069');

    elements.append('g')
      .attr('transform',function(d,i){ return 'translate(' + d.third * w + ',' + 0 + ')'})
      .append('path')
      .attr('d','M0' + -(2*h) + 'L0 ' + -h + ' L' + w + ' ' + h +' L' + w + ' 0 Z')
      .attr('fill','#FD6069');

    elements.append('g')
      .attr('transform',function(d,i){ return 'translate(' + d.fourth * w + ',' + 0 + ')'})
      .append('path')
      .attr('d','M0' + -(2*h) + 'L0 ' + -h + ' L' + w + ' ' + h +' L' + w + ' 0 Z')
      .attr('fill','#FD6069');

    function update(dy){
      var transition = svg.selectAll('.chart').transition().duration(5000);
      transition.attr('transform','translate(0,' + dy + ')');
    }

    update(-1000);
  }

  ngOnInit() {
    this.redrawOnResize = this.renderer.listenGlobal('window', 'resize', (event) => {
     this.drawWinewood();
    });
    this.element =  d3.select('.winewood')._groups[0][0];
    this.drawWinewood();
  }

  ngOnDestroy(){
    this.redrawOnResize();
  }

}
