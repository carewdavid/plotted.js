import {Point} from './point'
import {Properties} from './properties'

export class Line extends Properties{
    start: Point;
    end: Point;

    constructor(start: Point, end: Point){
        super();
        this.start = start;
        this.end = end;
    }

    exportSVG(): string{
        return `<line x1="${this.start.x}" y1="${this.start.y}" x2="${this.end.x}" y2="${this.end.y}" ${this.properties()}/>`
    }

    draw(canvas: CanvasRenderingContext2D){
        canvas.strokeStyle = this.attributes.get('stroke');
        canvas.beginPath();
        canvas.moveTo(this.start.x, this.start.y);
        canvas.lineTo(this.end.x, this.end.y);
        canvas.stroke();
    }
}