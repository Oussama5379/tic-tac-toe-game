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

	const markCell = (row, column, player) => {
		if (board[row][column] === 1 || board[row][column] === 2) {
			return;
		}
		board[row][column] = player.number;
	};
	return { getBoard, markCell };
}
