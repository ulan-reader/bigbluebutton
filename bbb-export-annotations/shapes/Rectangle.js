import {Rect} from '@svgdotjs/svg.js';
import {Geo} from './Geo.js';

/**
 * Creates an SVG rectangle shape from Tldraw v2 JSON data.
 *
 * @class Rectangle
 * @extends {Geo}
 */
export class Rectangle extends Geo {
  /**
   * Draws a rectangle shape based on the instance properties.
   *
   * @method draw
<<<<<<< HEAD
   * @return {Promise<G>} An SVG group element containing
   * the drawn rectangle shape.
   *
 */
  async draw() {
=======
   * @return {G} An SVG group element containing the drawn rectangle shape.
   *
 */
  draw() {
>>>>>>> origin/master-dev
    const rectGroup = this.shapeGroup;

    const rectangle = new Rect({
      'x': 0,
      'y': 0,
      'width': this.w,
      'height': this.h + this.growY,
      'stroke': this.shapeColor,
      'stroke-width': this.thickness,
      'style': this.dasharray,
    });

    // Simulate perfect-freehand effect
    if (this.dash === 'draw') {
      rectangle.attr('rx', this.thickness);
      rectangle.attr('ry', this.thickness);
    }

    this.setFill(rectangle);
    rectGroup.add(rectangle);
<<<<<<< HEAD
    await this.drawLabel(rectGroup);
=======
    this.drawLabel(rectGroup);
>>>>>>> origin/master-dev

    return rectGroup;
  }
}
