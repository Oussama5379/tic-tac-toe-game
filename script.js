function GameBoard() {
	const rows = 3;
	const columns = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

	const printBoard = () => {
		const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
		console.log(boardWithCellValues);
	};

	const markCell = (row, column, number) => {
		board[row][column].addMark(number);
	};
	return { getBoard, markCell, printBoard };
}
function Cell() {
	let value = 0;
	const addMark = (number) => {
		value = number;
	};
	const getValue = () => value;

	return { addMark, getValue };
}

function GameController(firstPlayerName = "playerOne", secondPlayerName = "secondPlayer") {
	const gameBoard = GameBoard();
	const players = [
		{
			name: firstPlayerName,
			number: 1,
		},
		{
			name: secondPlayerName,
			number: 2,
		},
	];
	let currentPlayer = players[0];
	const getCurrentPlayer = () => currentPlayer;
	const switchTurn = () => {
		if (currentPlayer === players[0]) {
			currentPlayer = players[1];
		} else {
			currentPlayer = players[0];
		}
	};
	const startNewRound = () => {
		gameBoard.printBoard();
		console.log(currentPlayer.name + "'s turn");
	};
	const playRound = (player) => {
		let colChoice = prompt("give the column");
		let rowChoice = prompt("give the row");
		while (
			gameBoard.getBoard()[rowChoice][colChoice].getValue() === 1 ||
			gameBoard.getBoard()[rowChoice][colChoice].getValue() === 2
		) {
			colChoice = prompt("give the column");
			rowChoice = prompt("give the row");
		}

		gameBoard.markCell(rowChoice, colChoice, player.number);
		if (playerWin(player, gameBoard.getBoard())) {
			console.log(player.name + " wins");
			return;
		} else if (fullBoard(gameBoard.getBoard())) {
			console.log("NO body wins");
			return;
		}
		switchTurn();
		startNewRound();
	};
	function playerWin(player, board) {
		for (let i = 0; i < 3; i++) {
			if (
				board[i][0].getValue() === player.number &&
				board[i][1].getValue() === player.number &&
				board[i][2].getValue() === player.number
			) {
				return true;
			}
			if (
				board[0][i].getValue() === player.number &&
				board[1][i].getValue() === player.number &&
				board[2][i].getValue() === player.number
			) {
				return true;
			}
		}
		if (
			board[0][0].getValue() === player.number &&
			board[1][1].getValue() === player.number &&
			board[2][2].getValue() === player.number
		) {
			return true;
		}
		if (
			board[0][2].getValue() === player.number &&
			board[1][1].getValue() === player.number &&
			board[2][0].getValue() === player.number
		) {
			return true;
		}
		return false;
	}
	function fullBoard(board) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j].getValue() !== 1 && board[i][j].getValue() !== 2) {
					return false;
				}
			}
		}
		return true;
	}
	startNewRound();
	return { playRound, getCurrentPlayer };
}
const game = GameController();
