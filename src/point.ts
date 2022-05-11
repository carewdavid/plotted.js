/**
 * @classdesc A 2d point
 */
class Point {
    x: number;
    y: number;

    /** @constructor */
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    /** Add to a point
     * @param {(number|Point)} The quantity to add
     * @returns {Point} The resulting Point
    */
    add(delta: number | Point): Point {
        if(typeof delta === "number"){
        return new Point(this.x + delta, this.y + delta);
        }else{
            return new Point(this.x + delta.x, this.y + delta.y);
        }
    }

        /** Subract from a point
     * @param {(number|Point)} The quantity to subtract
     * @returns {Point} The resulting Point
    */
    subtract(delta: number | Point): Point {
        if(typeof delta === "number"){
        return new Point(this.x - delta, this.y - delta);
        }else{
            return new Point(this.x - delta.x, this.y - delta.y);
        }
    }

    /** Multiply a point by a scalar
     * @returns The resulting point
    */
    mult(delta: number): Point {
        return new Point(this.x * delta, this.y * delta);
    }

    /** Divide a point by a scalar
     * @returns The resulting point
    */
         div(delta: number): Point {
            return new Point(this.x / delta, this.y / delta);
        }
}