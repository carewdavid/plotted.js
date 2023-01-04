import {Properties} from './properties'
import {Point} from './point'
//import { Path } from './path';

export class Circle extends Properties {
    center: Point;
    radius: number;

    //TODO strokePath
    constructor(center: Point, radius: number){
        super();
        this.center = center;
        this.radius = radius;
    }

    exportSVG(): string {
        return `<circle cx="${this.center.x}" cy="${this.center.y}" r="${this.radius}" ${this.properties()}/>`;
    }

    draw(canvas: CanvasRenderingContext2D) {
        let fill = this.attributes.get('fill') || 'none';
        //canvas.lineWidth = Number.parseFloat(this.attributes.get('strokeWidth')) || 1;
        if(fill !== 'none'){
        canvas.fillStyle = fill;
        canvas.beginPath();
        canvas.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        canvas.fill();
        }
        canvas.strokeStyle = this.attributes.get('stroke') || 'black';
        canvas.beginPath();
        canvas.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        canvas.stroke();
    }
}

