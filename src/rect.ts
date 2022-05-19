import {Properties} from './properties'
import {Point} from './point'

export class Rect extends Properties{
    position: Point;
    width: number;
    height: number;

    constructor(position: Point, width: number, height: number){
        super();
        this.position = position;
        this.width = width;
        this.height = height;
    }

    exportSVG(): string{
        return `<rect x="${this.position.x}" y="${this.position.y}" width="${this.width}" height="${this.height}" ${this.properties()}/>`
    }

    draw(canvas: CanvasRenderingContext2D){
        canvas.strokeStyle = this.attributes.get('stroke');
        canvas.fillStyle = this.attributes.get('fill');
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}