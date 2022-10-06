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
}

