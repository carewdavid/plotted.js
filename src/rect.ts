import {Properties} from './properties'
import {Point} from './point'
import { Path } from './path';

export class Rect extends Properties{
    position: Point;
    width: number;
    height: number;
    strokePath: Path;
    nw: Point;
    ne: Point;
    se: Point;
    sw: Point;


    constructor(position: Point, width: number, height: number){
        super();
        this.position = position;
        this.width = width;
        this.height = height;

        const vertical = new Point(0, height);
        const horizontal = new Point(width, 0);

        //Set corners
        this.nw = position;
        this.ne = position.add(horizontal);
        this.sw = position.add(vertical);
        this.se = position.add(horizontal).add(vertical);

        this.strokePath = new Path([this.nw, this.ne, this.se, this.sw]).close();

    }

    exportSVG(): string{
        return `<rect x="${this.position.x}" y="${this.position.y}" width="${this.width}" height="${this.height}" ${this.properties()}/>`
    }

    draw(canvas: CanvasRenderingContext2D){
        canvas.fillStyle = this.attributes.get('fill');
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.strokePath.fill('none')
        this.strokePath.stroke(this.attributes.get('stroke'));
        this.strokePath.draw(canvas);
    }
}