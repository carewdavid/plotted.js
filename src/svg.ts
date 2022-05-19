import {Point} from './point';
import {Line} from './line';
import {Rect} from './rect'




    
class SVG {
    width: number;
    height: number;
    objects: any[];
    canvas: CanvasRenderingContext2D;
    origin: Point;
    center: Point;

    static readonly INCH: number = 96;
    static readonly FOOT: number = this.INCH * 12
    static readonly MILE: number = this.FOOT * 5280
    static readonly CENTIMETER: number = 37.795
    static readonly MILLIMETER: number = this.CENTIMETER * .1
    static readonly METER: number = this.CENTIMETER * 100
    static readonly KILOMETER: number = this.METER * 1000

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
}
export default {
    SVG: SVG,
    Point: Point,
    Line: Line,
    Rect: Rect
}