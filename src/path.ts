import {Properties} from './properties'
import {Point} from './point'

/**@classdesc Represent an SVG <path> object. https://www.w3.org/TR/SVG11/paths.html */

interface MoveCmd {
    kind: "move";
    target: Point;
}

interface LineCmd {
    kind: "line";
    target: Point;
}

interface CurveCmd {
    kind: "curve";
    target: Point;
    control: Point;
}

interface BezierCmd {
    kind: "bezier";
    target: Point;
    control1: Point;
    control2: Point;
}

interface CloseCmd {
    kind: "close";
}

type PathCommand = MoveCmd | LineCmd | CurveCmd | BezierCmd | CloseCmd;


export class Path extends Properties{
    commands: PathCommand[];
    vertices: Point[];
    path?: Path2D;

    constructor(start: Point | Point[] | undefined){
        super();
        this.commands = [];
        this.vertices = [];

        if(start instanceof Point){
            this.moveTo(start);
        }else if(start instanceof Array){
            this.moveTo(start[0]);
            for(let i = 1; i < start.length; i++){
                this.lineTo(start[i]);
            }
        } 
    }

    _renderCommands(): string{
        let result = "";
        for(let cmd of this.commands){
            switch(cmd.kind){
                case "move": result += `M ${cmd.target.x} ${cmd.target.y}`
                break;
                case "line": result += `L ${cmd.target.x} ${cmd.target.y}`
                break;
                case "curve": result += `Q ${cmd.control.x} ${cmd.control.y} ${cmd.target.x} ${cmd.target.y}`;
                break;
                case "bezier": result += `C ${cmd.control1.x} ${cmd.control1.y} ${cmd.control2.x} ${cmd.control2.y} ${cmd.target.x} ${cmd.target.y}`;
                break;
                case "close": result += 'Z';
            }
        }

        return result;
    }

    exportSVG(): string{
        return `<path ${this.properties()} d="${this._renderCommands()}"`;
    }

    draw(canvas: CanvasRenderingContext2D){
        canvas.strokeStyle = this.attributes.get("stroke") || 'black';
        canvas.lineWidth = Number.parseFloat(this.attributes.get("strokeWidth")) || 1;
        this.path = new Path2D(this._renderCommands());
        canvas.stroke(this.path);
        const fill = this.attributes.get('fill') || 'none';
        if(fill !== 'none'){
            canvas.fillStyle = fill;
            canvas.fill(this.path);
        }
    }


    //Absolute movement commands

    /**Move to position */
    moveTo(target: Point): Path{
        this.vertices.push(target);
        this.commands.push({kind: "move", target: target});
        return this;
    }

    /**Draw a line to position */
    lineTo(target: Point): Path{
        this.vertices.push(target);
        this.commands.push({kind: "line", target: target});
        return this;
    }

    /**Draw a quadratic bezier curve to target with control point control */
    curveTo(control: Point, target: Point): Path{
        this.vertices.push(target); //Only the target point is a vertex in the path
        this.commands.push({kind: "curve", target: target, control: control});
        return this;
    }

    /**Draw a cubic bezier curve to target with control points control1 and control2 */
    bezierTo(control1: Point, control2: Point, target: Point): Path{
        this.vertices.push(target);
        this.commands.push({kind: "bezier", target: target, control1: control1, control2: control2});
        return this;
    }

    close(): Path{
        this.commands.push({kind: "close"});
        return this;
    }
}