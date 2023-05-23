
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
    fill(fillStyle: string): Properties{
        this.attributes.set('fill', fillStyle);
        return this;
    }

    /**Set stroke style */
    stroke(strokeStyle: string): Properties{
        this.attributes.set('stroke', strokeStyle);
        return this;
    }

    /**Set stroke width */
    strokeWidth(width: number): Properties{
        this.attributes.set('stroke-width', width.toString());
        return this;
    }

    /**Add a generic attribute */
    addAttribute(attribute: string, value: string): Properties{
        this.attributes.set(attribute, value);
        return this;
    }

    /**Render the objects properties to a string for SVG export*/
    properties(): string{
        let props: string = "";
        for(let [k, v] of this.attributes){
            props += ` ${k}="${v}"`
        }
        return props;
    }
}
