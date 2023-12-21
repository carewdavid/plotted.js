import {Point} from './point';
import {Line} from './line';
import {Rect} from './rect';
import {Path} from './path';
import {Circle} from './circle'
//import {Group} from './group';

export class SVG {
    width: number;
    height: number;
    layers: Map<string, group>;
    currentGroup: group;
    canvas: CanvasRenderingContext2D;
    origin: Point;
    center: Point;
    area: Rect;

    constructor(width: number, height: number, canvas: CanvasRenderingContext2D){
        this.width = width;
        this.height = height;
        this.origin = new Point(0, 0);
        this.center = new Point(width / 2, height / 2);
        this.canvas = canvas;
        this.area = new Rect(this.origin, width, height);
        //Intuitively, we'd have to use an array to store the layers since the order matters.
        //Fortuneately, javascript actually does define an ordering for elements of a map.
        //They're in order of insertion, just what we want.
        //Using an array would have been less than ideal, since looking up layers in setGroup
        //could potentially happen in a tight loop.
        this.layers = new Map();
        this.setGroup('background');
    }

    exportSVG(): string {
        let header = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="${this.width}" height="${this.height}">`;
        let body = '';
        let layerNo = 0;
        for(let [_, layer] of this.layers){
            const layerName = `${layerNo}${layer.id}`;
            let groupString = `<g inkscape:groupmode="layer" inkscape:label="${layerName}" id="${layerName}">`
            for(let object of layer.objects){
                groupString += object.exportSVG();
            }
            groupString += '</g>';
            layerNo++;
            body += groupString;
        }
        let footer = '</svg>';
        return header + body + footer;
    }

    draw(){
        for(let layer of this.layers.values()){
            for(let object of layer.objects){
                object.draw(this.canvas);
            }
        }
    }

    circle(center, radius): Circle{
        let c = new Circle(center, radius);
        this.applyGroupStyle(c);
        this.currentGroup.objects.push(c);
        return c;
    }

    line(start, end): Line{
        let l = new Line(start, end);
        this.applyGroupStyle(l);
        this.currentGroup.objects.push(l);
        return l;
    }

    rect(pos: Point, width: number, height: number): Rect{
        let r = new Rect(pos, width, height);
        this.applyGroupStyle(r);
        this.currentGroup.objects.push(r);
        return r;
    }

    path(start?: Point): Path{
        let p = new Path(start);
        this.applyGroupStyle(p);
        this.currentGroup.objects.push(p);
        return p;
    }

   setGroup(name: string){
       let g = this.layers.get(name);
       if(g === undefined){
           g = makeGroup(name);
           this.layers.set(name, g);
       }
       this.currentGroup = g;
   }

   applyGroupStyle(object: any){
       object.fill(this.currentGroup.fill);
       object.stroke(this.currentGroup.stroke);
   }

   fill(fillStyle: string){
        this.currentGroup.fill = fillStyle;
   }

   stroke(strokeStyle: string){
       this.currentGroup.stroke = strokeStyle;
   }

    addChild(object: any, layer?: string): any {
        let group
        if(layer !== undefined){
            group = this.layers.get(layer);
        }
        //Default to the current group if no layer is passed, or the requested one does not exist
        if(group === undefined){
            group = this.currentGroup;
        }
        this.currentGroup.objects.push(object);
        return object;
    }
}

function makeGroup(id: string): group {
    return {id: id, objects: [], fill: 'none', stroke: 'black'};
}

type group = {
    id: string,
    objects: any[],
    fill: string,
    stroke: string,
}


/*
class Group {
    id: string;

    constructor(id: string, width: number, height: number, canvas: CanvasRenderingContext2D){
        this.id = id;
    }

    draw(){
        for(let object of this.objects){
            object.draw(this.canvas)
        }
    }

    exportSVG(): string {
        const header = `<g inkscape:groupmode="layer" inkscape:label="${this.id}" id="${this.id}"}>`;
        let body = '';
        for(let object of this.objects){
            body += object.exportSVG();
        }
        let footer = '</g>';
        return header + body + footer
    }
}
*/
