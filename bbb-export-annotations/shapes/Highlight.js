import {Draw} from './Draw.js';
<<<<<<< HEAD
import {Shape, ColorTypes} from './Shape.js';
=======
>>>>>>> origin/master-dev

/**
 * Represents a Highlight shape, extending the functionality of the Draw class.
 *
 * @class Highlight
 * @extends {Draw}
 */
export class Highlight extends Draw {
  /**
   * Creates an instance of the Highlight class.
   *
   * @param {Object} highlight - The highlighter's JSON data.
   */
  constructor(highlight) {
    super(highlight);

    this.fill = 'none';
<<<<<<< HEAD
    this.shapeColor = Shape.colorToHex(this.color, ColorTypes.HighlightColor);
=======
    this.shapeColor = '#fedd00';
>>>>>>> origin/master-dev
    this.thickness = this.thickness * 7;
    this.isClosed = false;
  }
}
