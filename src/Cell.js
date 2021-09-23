import React, { Component } from "react";
import "./Cell.css";
/*This has no state- just 2 props:
 * -flipCellsAroundMe: a function recommend from the borad which flips this
 *  cell and the cells around it
 * -isLit: boolean, is this cell lit?
 *  This handleClick--by calling flipCellsAroundMe
 */

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    //call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe();
  }
  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return <td className={classes} onClick={this.handleClick} />;
  }
}

export default Cell;
