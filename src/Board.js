import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";
/* Game board of Lights out
   properties:
   -numRow: number of rows of board
   -numCol: number of columns of board
   -chanceLightStarsOn: float, chance any cell is lit is lit at start of game
   
   *State:
   - hasWon: boolean, true when board is all of
   -board: array-of-arrays of true/false

   For this board:

    . . . 
    0 0 .
    . . .  (where . is off and 0 is on)

    This would be: [[f,f,f],[t,t,f],[f,f,f]]
    This should render an HTML table of individaul <Cell/>
    This doesnt handle any clicks --- clicks are on individual cells

  */

class Board extends Component {
  static defaultProps = {
    numRows: 5,
    numCols: 5,
    chanceLightStartsOn: 0.25
  };

  // todo: set initial state
  constructor(props) {
    super(props);

    this.state = {
      board: this.createBoard()
    };
  }
  //create a board numRows high/ numcols wide, each cell randomly lit
  createBoard() {
    let board = [];
    //todo: create array of arrays -> true/false values
    for (let y = 0; y < this.props.numRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.numCols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }
  //handle changing a cell: update & determine if winner
  flipCellsAround(coord) {
    let { numCols, numRows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      //if this coord is actually on borad, flip it
      if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y, x); //Flip initial cell
    flipCell(y, x - 1); //flip left
    flipCell(y, x + 1); //flip right
    flipCell(y - 1, x); //flip below
    flipCell(y + 1, x); //flip above

    // win when every cell is turned off
    //todo: determine is game as been won
    let hasWon = false;
    board.every(row => row.every(cell => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */
  makeTable() {
    let tblBoard = [];
    for (let y = 0; y < this.props.numRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.numCols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }
  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span classsName="neon-blue">WIN 👏</span>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            {this.makeTable()}
          </div>
        )}
      </div>
    );
  }
}

export default Board;
