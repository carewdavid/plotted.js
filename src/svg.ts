import {Point} from './point';
import {Line} from './line';
import {Rect} from './rect';
import {Path} from './path';


//Constants for physical distances
const INCH: number = 96;
const FOOT: number = INCH * 12
const MILE: number = FOOT * 5280
const CENTIMETER: number = 37.795
const MILLIMETER: number = CENTIMETER * .1
const METER: number = CENTIMETER * 100
const KILOMETER: number = METER * 1000
    
class SVG {
    width: number;
    height: number;
    objects: any[];
    canvas: CanvasRenderingContext2D;
    origin: Point;
    center: Point;

    constructor(width: number, height: number, canvas: CanvasRenderingContext2D){
        this.width = width;
        this.height = height;
        this.origin = new Point(0, 0);
        this.center = new Point(width / 2, height / 2);
        this.canvas = canvas;
        this.objects = [];
    }

    exportSVG(): string {
        let header = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="${this.width}" height="${this.height}">`;
        let body = '';
        for(let object of this.objects){
            body = body.concat(object.exportSVG());
        }
        let footer = '</svg>';
        return header + body + footer;
    }

    draw(){
        for(let object of this.objects){
            object.draw(this.canvas);
        }
    }

    line(start, end): Line{
        let l = new Line(start, end);
        l.stroke('black');
        this.objects.push(l);
        return l;
    }

    rect(pos: Point, width: number, height: number): Rect{
        let r = new Rect(pos, width, height);
        r.stroke('black');
        r.fill('none');
        this.objects.push(r);
        return r;
    }

    path(start?: Point): Path{
        let p = new Path(start);
        p.stroke('black');
        p.fill('none');
        this.objects.push(p);
        return p;
    }

    addChild(object: any): any {
        this.objects.push(object);
        return object;
    }
}
export default {
    SVG: SVG,
    Point: Point,
    Line: Line,
    Rect: Rect,
    Path: Path,

    IN: INCH,
    FT: FOOT,
    MI: MILE,
    MM: MILLIMETER,
    CM: CENTIMETER,
    M: METER,
    KM: KILOMETER,

}