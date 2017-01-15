import { Component, OnInit, OnDestroy, Renderer, ElementRef } from '@angular/core';
import {} from '@angular/';

// D3 is loaded via CDN on index.html.
declare var d3: any;

@Component({
  selector: 'app-redish',
  templateUrl: './redish.component.html',
  styleUrls: ['./redish.component.css']
})
export class RedishComponent implements OnInit,OnDestroy {
  private element : any = d3.select('.redish')._groups[0][0];

  private full_width : number;
  private full_height : number;
  private margins : Object = {'top' : 0, 'bottom' : 0, 'left' : 0, 'right' : 0 };
  private width : number;
  private height : number;
  private redrawOnResize : Function;

  constructor( private el: ElementRef, private renderer: Renderer) {

  }

  drawSVG(): void{
    this.full_width = this.element.parentElement.parentElement.clientWidth;
    this.full_height = this.element.parentElement.parentElement.clientHeight;
    this.width = this.full_width - this.margins['top'] - this.margins['bottom'];
    this.height = this.full_height - this.margins['left'] - this.margins['right'];

    let radius = this.width * 2;

    let x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, this.width]);

    let y = d3.scaleLinear()
      .domain([0, 100])
      .range([0, this.height]);

    d3.select('.redish').select('svg').remove();

    let svg = d3.select('.redish')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class','.redish-svg');

    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'white');

    function generateCircles(initial: Boolean){

      (initial)
        ? ( addCircle(radius,Math.floor(Math.random() * 100),Math.floor(Math.random() * 100)))
        : false;

      setTimeout(function() {
        let x = Math.floor(Math.random() * 100);
        let y = Math.floor(Math.random() * 100);
        addCircle(radius,x,y);
        generateCircles(false);
      }, 1000);

    }

    generateCircles(true);

    // Circle animation
    function addCircle(radius:number,pos_x:number,pos_y:number){
      svg.append('circle')
        .attr('transform','translate(' + x(pos_x) + ',' + y(pos_y) + ')')
        .attr('r',10)
        .attr('fill','red')
        .transition().duration(500)
        .attr('r',0)
          .transition().delay(250).duration(3000)
            .attr('r',radius).transition().delay(5000).remove();

      svg.append('circle')
        .attr('transform','translate(' + x(pos_x) + ',' + y(pos_y) + ')')
        .attr('r',0)
        .attr('fill','white')
        .transition().delay(1000).duration(3000)
        .attr('r',radius)
          .transition().delay(5000).remove();
    }
  }

  ngOnInit() {
    this.redrawOnResize = this.renderer.listenGlobal('window', 'resize', (event) => {
      this.drawSVG();
    });

    this.element =  d3.select('.redish')._groups[0][0];
    this.drawSVG();
  }

  ngOnDestroy(){
    this.redrawOnResize();
  }

}
