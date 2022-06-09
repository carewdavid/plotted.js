import {Point} from './point';
import {Line} from './line';
import {Rect} from './rect';
import {Path} from './path';
import {SVG} from './svg';
//Constants for physical distances
const INCH: number = 96;
const FOOT: number = INCH * 12;
const MILE: number = FOOT * 5280;
const CENTIMETER: number = 37.795;
const MILLIMETER: number = CENTIMETER * .1;
const METER: number = CENTIMETER * 100;
const KILOMETER: number = METER * 1000;
export default {
    IN: INCH,
    FT: FOOT,
    MI: MILE,
    MM: MILLIMETER,
    CM: CENTIMETER,
    M: METER,
    KM: KILOMETER,

    SVG: SVG,
    Point: Point,
    Line: Line,
    Rect: Rect,
    Path: Path,
}