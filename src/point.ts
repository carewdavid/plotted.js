/**
 * @classdesc A 2d point
 */
export class Point {
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
    
    /**Return the length of the point */
    length(): number{
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /** Calculate the Euclidean distance to other */
    dist(other: Point): number{
        const dx: number = this.x - other.x;
        const dy: number = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**  */
    normalize(): Point {
        const len: number = this.length();
        return new Point(this.x / len, this.y / len);
    }

    /**Rotate a point
     * @param {number} angle The amount to rotate in radians
     * @param {Point} [center] The point to rotate around. Defaults to (0, 0)
     */
    rotate(angle: number, center?: Point){
        if(typeof center === 'undefined'){
            center = new Point(0, 0);
        }

        const p = this.subtract(center);
        const newX = p.x * Math.cos(angle) - p.y * Math.sin(angle);
        const newY = p.x * Math.sin(angle) + p.y * Math.cos(angle);
        return new Point(newX, newY).add(center);
    }

    /**Create a unit vector with the given angle*/
    static fromAngle(angle: number): Point{
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        return new Point(x, y);
    }

    /**Create a copy of the point */
    copy(): Point{
        return new Point(this.x, this.y);
    }
}