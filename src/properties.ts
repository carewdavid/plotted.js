
/**@classdesc 
 * Parent class to manage the attributes shared by most SVG objects, e.g. fill and stroke.
*/
export class Properties{
    //We store everyting in a map
    attributes: Map<string, string>;

    constructor(){
        this.attributes = new Map();
    }

    /**Set fill style */
    fill(fillStyle: string){
        this.attributes.set('fill', fillStyle);
    }

    /**Set stroke style */
    stroke(strokeStyle: string){
        this.attributes.set('stroke', strokeStyle);
    }

    /**Set stroke width */
    strokeWidth(width: number){
        this.attributes.set('strokeWidth', width.toString());
    }

    /**Add a generic attribute */
    addAttribute(attribute: string, value: string){
        this.attributes.set(attribute, value);
    }

    /**Render the objects properties to a string for SVG export*/
    properties(): string{
        let props: string = "";
        for(let [k, v] of this.attributes){
            props += `${k}="${v}"`
        }
        return props;
    }
}