import {Polygon as SVGPolygon} from '@svgdotjs/svg.js';
import {Geo} from './Geo.js';

/**
 * Creates an SVG hexagon shape from Tldraw v2 JSON data.
 *
 * @class Hexagon
 * @extends {Geo}
 */
export class Hexagon extends Geo {
  /**
   * Draws a hexagon shape on the SVG canvas.
<<<<<<< HEAD
   * @return {Promise<G>} Returns the SVG group element containing the hexagon.
   */
  async draw() {
=======
   * @return {G} Returns the SVG group element containing the hexagon.
   */
  draw() {
>>>>>>> origin/master-dev
    const width = this.w;
    const height = this.h + this.growY;
    const sides = 6;

    // Get the vertices of the hexagon
    const pointsOnPerimeter = Geo.getPolygonVertices(width, height, sides);

    // Convert the vertices to SVG polygon points format
    const points = pointsOnPerimeter.map((p) => `${p.x},${p.y}`).join(' ');

    // Create the SVG polygon
    const hexagonGroup = this.shapeGroup;
    const hexagon = new SVGPolygon({
      points,
      'stroke': this.shapeColor,
      'stroke-width': this.thickness,
      'style': this.dasharray,
    });

    // Fill the polygon if required
    this.setFill(hexagon);
    hexagonGroup.add(hexagon);
<<<<<<< HEAD
    await this.drawLabel(hexagonGroup);
=======
    this.drawLabel(hexagonGroup);
>>>>>>> origin/master-dev

    return hexagonGroup;
  }
}
