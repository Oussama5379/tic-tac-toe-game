const newGameButton = document.querySelector(".new-game-button");
const displayScreen = document.querySelector(".display-screen");

newGameButton.addEventListener("click", () => {
	const cells = document.querySelectorAll(".cell");
	const playerOneName = document.querySelector("#player-one-name").value;
	const playerTwoName = document.querySelector("#player-two-name").value;
	cells.forEach((item) => {
		item.textContent = "";
	});
	const game = GameController(playerOneName, playerTwoName);
	displayScreen.textContent = game.getCurrentPlayer().name + "'s round";

	cells.forEach((item) => {
		item.addEventListener("click", (e) => {
			let rowChoice = Number(e.target.dataset.row);
			let colChoice = Number(e.target.dataset.col);
			game.playRound(game.getCurrentPlayer(), rowChoice, colChoice, e.target);
		});
	});
});

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

	const markCell = (row, column, number) => {
		board[row][column].addMark(number);
	};
	return { getBoard, markCell };
}
function Cell() {
	let value = 0;
	const addMark = (number) => {
		value = number;
	};
	const getValue = () => value;

	return { addMark, getValue };
}

function GameController(firstPlayerName, secondPlayerName) {
	const gameBoard = GameBoard();
	const players = [
		{
			name: firstPlayerName !== "" ? firstPlayerName : "Player One",
			number: 1,
		},
		{
			name: secondPlayerName !== "" ? secondPlayerName : "Player Two",
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

	const playRound = (player, rowChoice, colChoice, cell) => {
		if (
			gameBoard.getBoard()[rowChoice][colChoice].getValue() !== 1 &&
			gameBoard.getBoard()[rowChoice][colChoice].getValue() !== 2
		) {
			gameBoard.markCell(rowChoice, colChoice, player.number);

			if (player.number === 1) {
				cell.textContent = "X";
			} else {
				cell.textContent = "O";
			}
			if (playerWin(player, gameBoard.getBoard())) {
				displayScreen.textContent = player.name + " WINS";
				return;
			} else if (fullBoard(gameBoard.getBoard())) {
				displayScreen.textContent = " It's a draw";
				return;
			}

			switchTurn();
			displayScreen.textContent = getCurrentPlayer().name + "'s round";
		}
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

	return { playRound, getCurrentPlayer };
}
