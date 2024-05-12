// Durée d'un tour en secondes

//https://www.geeksforgeeks.org/deep-q-learning/

const TURN_DURATION = 30;

const DECK_INIT = {
    dices: [
        { id: 1, value: '', locked: true },
        { id: 2, value: '', locked: true },
        { id: 3, value: '', locked: true },
        { id: 4, value: '', locked: true },
        { id: 5, value: '', locked: true },
    ],
    rollsCounter: 1,
    rollsMaximum: 3
};

const CHOICES_INIT = {
    isDefi: false,
    isSec: false,
    idSelectedChoice: null,
    availableChoices: [],
};

const GRID_INIT = [
    [
        { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false },
        { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false },
        { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false },
        { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false },
        { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false },
        { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false },
        { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: false },
        { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false },
        { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false },
        { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false },
        { viewContent: 'Yam', id: 'yam', owner: null, canBeChecked: false },
        { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false },
        { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false },
        { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: false },
        { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false },
        { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false },
        { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false },
    ],
    [
        { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false },
        { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false },
        { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false },
        { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false },
        { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false },
    ]
];

const ALL_COMBINATIONS = [
    { value: 'Brelan1', id: 'brelan1' },
    { value: 'Brelan2', id: 'brelan2' },
    { value: 'Brelan3', id: 'brelan3' },
    { value: 'Brelan4', id: 'brelan4' },
    { value: 'Brelan5', id: 'brelan5' },
    { value: 'Brelan6', id: 'brelan6' },
    { value: 'Full', id: 'full' },
    { value: 'Carré', id: 'carre' },
    { value: 'Yam', id: 'yam' },
    { value: 'Suite', id: 'suite' },
    { value: '≤8', id: 'moinshuit' },
    { value: 'Sec', id: 'sec' },
    { value: 'Défi', id: 'defi' }
];

const GAME_INIT = {
    gameState: {
        currentTurn: 'player:1',
        timer: null,
        player1Score: 0,
        player2Score: 0,
        player1Token: 12,
        player2Token: 12,
        choices: {},
        deck: {},
        isDefi: false,
        isFinished: false,
        winner: null,
    }
}

const GameService = {

    init: {
        gameState: () => {
            const game = { ...GAME_INIT };
            game['gameState']['timer'] = TURN_DURATION;
            game['gameState']['deck'] = { ...DECK_INIT };
            game['gameState']['choices'] = { ...CHOICES_INIT };
            game['gameState']['grid'] = [ ...GRID_INIT];
            return game;
        },

        deck: () => {
            return { ...DECK_INIT };
        },

        choices: () => {
            return { ...CHOICES_INIT };
        },

        grid: () => {
            return [ ...GRID_INIT];
        }
    },

    send: {
        forPlayer: {
            viewGameState: (playerKey, game) => {
                return {
                    inQueue: false,
                    inGame: true,
                    idPlayer:
                        (playerKey === 'player:1')
                            ? game.player1Socket.id
                            : game.player2Socket.id,
                    idOpponent:
                        (playerKey === 'player:1')
                            ? game.player2Socket.id
                            : game.player1Socket.id
                };
            },

            viewQueueState: () => {
                return {
                    inQueue: true,
                    inGame: false,
                };
            },

            gameTimer: (playerKey, gameState) => {
                const playerTimer = gameState.currentTurn === playerKey ? gameState.timer : 0;
                const opponentTimer = gameState.currentTurn === playerKey ? 0 : gameState.timer;
                return { playerTimer: playerTimer, opponentTimer: opponentTimer };
            },

            deckViewState: (playerKey, gameState) => {
                const deckViewState = {
                    displayPlayerDeck: gameState.currentTurn === playerKey,
                    displayOpponentDeck: gameState.currentTurn !== playerKey,
                    displayRollButton: gameState.deck.rollsCounter <= gameState.deck.rollsMaximum,
                    rollsCounter: gameState.deck.rollsCounter,
                    rollsMaximum: gameState.deck.rollsMaximum,
                    dices: gameState.deck.dices
                };
                return deckViewState;
            },

            choicesViewState: (playerKey, gameState) => {

                const choicesViewState = {
                    displayChoices: true,
                    canMakeChoice: playerKey === gameState.currentTurn,
                    idSelectedChoice: gameState.choices.idSelectedChoice,
                    availableChoices: gameState.choices.availableChoices
                }

                return choicesViewState;
            },

            gridViewState: (playerKey, gameState) => {

                return {
                    displayGrid: true,
                    canSelectCells: (playerKey === gameState.currentTurn) && (gameState.choices.availableChoices.length > 0),
                    grid: gameState.grid
                };

            }
        }
    },

    timer: {  
        getTurnDuration: () => {
            return TURN_DURATION;
        }
    },

    dices: {
        roll: (dicesToRoll) => {
            const rolledDices = dicesToRoll.map(dice => {
                if (dice.value === "") {
                    // Si la valeur du dé est vide, alors on le lance en mettant le flag locked à false
                    const newValue = String(Math.floor(Math.random() * 6) + 1); // Convertir la valeur en chaîne de caractères
                    return {
                        id: dice.id,
                        value: newValue,
                        locked: false
                    };
                } else if (!dice.locked) {
                    // Si le dé n'est pas verrouillé et possède déjà une valeur, alors on le relance
                    const newValue = String(Math.floor(Math.random() * 6) + 1);
                    return {
                        ...dice,
                        value: newValue
                    };
                } else {
                    // Si le dé est verrouillé ou a déjà une valeur mais le flag locked est true, on le laisse tel quel
                    return dice;
                }
            });
            return rolledDices;
        },

        lockEveryDice: (dicesToLock) => {
            const lockedDices = dicesToLock.map(dice => ({
                ...dice,
                locked: true // Verrouille chaque dé
            }));
            return lockedDices;
        }
    },

    choices: {
        findCombinations: (dices, isDefi, isSec) => {
            // console.log(dices, isDefi, isSec)
            const availableCombinations = [];
            const allCombinations = ALL_COMBINATIONS;

            const counts = Array(7).fill(0); // Tableau pour compter le nombre de dés de chaque valeur (de 1 à 6)
            let hasPair = false; // Pour vérifier si une paire est présente
            let threeOfAKindValue = null; // Stocker la valeur du brelan
            let hasThreeOfAKind = false; // Pour vérifier si un brelan est présent
            let hasFourOfAKind = false; // Pour vérifier si un carré est présent
            let hasFiveOfAKind = false; // Pour vérifier si un Yam est présent
            let hasStraight = false; // Pour vérifier si une suite est présente
            let sum = 0; // Somme des valeurs des dés

            // Compter le nombre de dés de chaque valeur et calculer la somme
            for (let i = 0; i < dices.length; i++) {
                const diceValue = parseInt(dices[i].value);
                counts[diceValue]++;
                sum += diceValue;
            }

            // Vérifier les combinaisons possibles
            for (let i = 1; i <= 6; i++) {
                if (counts[i] === 2) {
                    hasPair = true;
                } else if (counts[i] === 3) {
                    threeOfAKindValue = i;
                    hasThreeOfAKind = true;
                } else if (counts[i] === 4) {
                    threeOfAKindValue = i;
                    hasThreeOfAKind = true;
                    hasFourOfAKind = true;
                } else if (counts[i] === 5) {
                    threeOfAKindValue = i;
                    hasThreeOfAKind = true;
                    hasFourOfAKind = true;
                    hasFiveOfAKind = true;
                }
            }

            const sortedValues = dices.map(dice => parseInt(dice.value)).sort((a, b) => a - b); // Trie les valeurs de dé

            // Vérifie si les valeurs triées forment une suite
            hasStraight = sortedValues.every((value, index) => index === 0 || value === sortedValues[index - 1] + 1);

            // Vérifier si la somme ne dépasse pas 8
            const isLessThanEqual8 = sum <= 8;

            // Retourner les combinaisons possibles via leur ID
            allCombinations.forEach(combination => {
                if (
                    ((combination.id.includes('brelan') && hasThreeOfAKind && parseInt(combination.id.slice(-1)) === threeOfAKindValue) && !isDefi)||
                    ((combination.id === 'full' && hasPair && hasThreeOfAKind) && !isDefi) ||
                    ((combination.id === 'carre' && hasFourOfAKind) && !isDefi) ||
                    ((combination.id === 'yam' && hasFiveOfAKind) && !isDefi) ||
                    ((combination.id === 'suite' && hasStraight) &&  !isDefi)||
                    ((combination.id === 'moinshuit' && isLessThanEqual8) &&  !isDefi) ||
                    (combination.id === 'defi' && isDefi && ((hasPair && hasThreeOfAKind ) ||hasFourOfAKind || hasFiveOfAKind || hasStraight ||isLessThanEqual8))
                ) {
                    console.log(isDefi)
                    availableCombinations.push(combination);
                }
            });


            const notOnlyBrelan = availableCombinations.some(combination => !combination.id.includes('brelan'));

            if (isSec && availableCombinations.length > 0 && notOnlyBrelan) {
                availableCombinations.push(allCombinations.find(combination => combination.id === 'sec'));
            }
            //console.log(availableCombinations)
            return availableCombinations;
        },
        decrementToken: (state) => {
            if(state.currentTurn  === 'player:1'){
                state.player1Token --;
            }else {
                state.player2Token --;
            }
            return state;
        }

    },

    grid: {

        resetcanBeCheckedCells: (grid) => {
            const updatedGrid = grid.map(row => row.map(cell => {
                return { ...cell, canBeChecked: false };    
            }));

            return updatedGrid;
        },

        updateGridAfterSelectingChoice: (idSelectedChoice, grid) => {

            const updatedGrid = grid.map(row => row.map(cell => {
                if (cell.id === idSelectedChoice && cell.owner === null) {
                    return { ...cell, canBeChecked: true };
                } else {
                    return cell;
                }
            }));
            return updatedGrid;
        },

        selectCell: (idCell, rowIndex, cellIndex, currentTurn, grid) => {
            const updatedGrid = grid.map((row, rowIndexParsing) => row.map((cell, cellIndexParsing) => {
                if ((cell.id === idCell) && (rowIndexParsing === rowIndex) && (cellIndexParsing === cellIndex && cell.owner === null)) {
                    return { ...cell, owner: currentTurn };
                } else {
                    return cell;
                }
            }));
        
            return updatedGrid;
        }

    },

    score: {
        checkScore: ( rowIndex, cellIndex, gameState, grid) => {
            // The idea is to traverse the entire grid and see if the current coordinates are aligned with the token that
            // has just been placed.
            const infoCurrentCell  = { row : rowIndex, column: cellIndex, haveScored: grid[rowIndex][cellIndex].haveScored }
            const rowCoordinateToScore = [infoCurrentCell];
            const colCoordinateToScore = [infoCurrentCell];
            const topBottomDiagCoordinateToScore = [infoCurrentCell]
            const bottomTopDiagCoordinateToScore = [infoCurrentCell]
            const addUniqueObject = (arr, obj) => {
                if( !arr.some(item => JSON.stringify(item) === JSON.stringify(obj))) {
                    arr.push(obj);
                }
            }
            const southWest = (rowIndex, cellIndex, aligned_row, aligned_col, aligned_top_bottom, grid, currentTurn) => {
                let frow = true;
                let fcol = true;
                let ftb = true;
                for (let rowN = rowIndex; rowN < 5; rowN++) {
                    for (let colN = cellIndex; colN < 5; colN++) {
                        const cellInfo = { row : rowN, column: colN, haveScored: grid[rowN][colN].haveScored }
                        // console.log(grid[rowN][colN]);
                        if (rowN === rowIndex && frow) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_row, cellInfo);
                            } else {
                                frow = false;
                            }
                        }
                        if (colN === cellIndex && fcol) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_col, cellInfo);
                            } else {
                                fcol = false;
                            }
                        }

                        let test1 = Math.abs(rowIndex - rowN);
                        let test2 = Math.abs(cellIndex - colN);
                        if (test1 === test2 && ftb) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_top_bottom, cellInfo);
                            } else {
                                ftb = false;
                            }
                        }
                    }
                }
            }

            const southEast = (rowIndex, cellIndex, aligned_row, aligned_col, aligned_bottom_top, grid, currentTurn) => {
                let frow = true;
                let fcol = true;
                let fbt = true;
                for (let rowN = rowIndex; rowN < 5; rowN++) {
                    for (let colN = cellIndex; colN >= 0; colN--) {
                        const cellInfo = { row : rowN, column: colN, haveScored: grid[rowN][colN].haveScored }
                        // console.log(grid[rowN][colN]);
                        if (rowN === rowIndex && frow) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_row, cellInfo);
                            } else {
                                frow = false;
                            }
                        }
                        if (colN === cellIndex && fcol) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_col, cellInfo);
                            } else {
                                fcol = false;
                            }
                        }

                        let test1 = Math.abs(rowIndex - rowN);
                        let test2 = Math.abs(cellIndex - colN);
                        if (test1 === test2 && fbt) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_bottom_top, cellInfo);
                            } else {
                                fbt = false;
                            }
                        }
                    }
                }
            }

            const northEast = (rowIndex, cellIndex, aligned_row, aligned_col, aligned_top_bottom, grid, currentTurn) => {
                let frow = true;
                let fcol = true;
                let ftb = true;
                for (let rowN = rowIndex; rowN >= 0; rowN--) {
                    for (let colN = cellIndex; colN >= 0; colN--) {
                        const cellInfo = { row : rowN, column: colN, haveScored: grid[rowN][colN].haveScored }
                        // console.log(grid[rowN][colN]);
                        if (rowN === rowIndex && frow) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_row, cellInfo);
                            } else {
                                frow = false;
                            }
                        }
                        if (colN === cellIndex && fcol) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_col, cellInfo);
                            } else {
                                fcol = false;
                            }
                        }

                        let test1 = Math.abs(rowIndex - rowN);
                        let test2 = Math.abs(cellIndex - colN);
                        if (test1 === test2 && ftb) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_top_bottom, cellInfo);
                            } else {
                                ftb = false;
                            }
                        }
                    }
                }
            }

            const northWest = (rowIndex, cellIndex, aligned_row, aligned_col, aligned_bottom_top, grid, currentTurn) => {
                let frow = true;
                let fcol = true;
                let fbt = true;
                for (let rowN = rowIndex; rowN >= 0; rowN--) {
                    for (let colN = cellIndex; colN < 5; colN++) {
                        const cellInfo = { row : rowN, column: colN, haveScored: grid[rowN][colN].haveScored }
                        if (rowN === rowIndex && frow) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_row,cellInfo);
                            } else {
                                frow = false;
                            }
                        }
                        if (colN === cellIndex && fcol) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_col, cellInfo);
                            } else {
                                fcol = false;
                            }
                        }

                        let test1 = Math.abs(rowIndex - rowN);
                        let test2 = Math.abs(cellIndex - colN);
                        if (test1 === test2 && fbt) {
                            if (grid[rowN][colN]['owner'] === currentTurn) {
                                addUniqueObject(aligned_bottom_top, cellInfo);
                            } else {
                                fbt = false;
                            }
                        }
                    }
                }
            }

            northEast(rowIndex, cellIndex, rowCoordinateToScore, colCoordinateToScore, topBottomDiagCoordinateToScore, grid, gameState.currentTurn)
            northWest(rowIndex, cellIndex, rowCoordinateToScore, colCoordinateToScore, bottomTopDiagCoordinateToScore, grid, gameState.currentTurn)
            southEast(rowIndex, cellIndex, rowCoordinateToScore, colCoordinateToScore, bottomTopDiagCoordinateToScore, grid, gameState.currentTurn)
            southWest(rowIndex, cellIndex, rowCoordinateToScore, colCoordinateToScore, topBottomDiagCoordinateToScore, grid, gameState.currentTurn)

            if (rowCoordinateToScore.length === 5 || colCoordinateToScore.length === 5 ||
                topBottomDiagCoordinateToScore.length === 5 || bottomTopDiagCoordinateToScore.length === 5) {
                gameState.isFinished = true;
                gameState.winner = gameState.currentTurn
                grid[rowIndex][cellIndex].haveScored = true
                return [gameState, grid]
                // console.log("on final ", rowIndex, cellIndex)
            }

            const cellsToUpdate = []

            let  maybeScoreOnRow = 0
            if(rowCoordinateToScore.length   >= 3 ){
                rowCoordinateToScore.forEach(cell => {
                    if(!cell.haveScored){
                        maybeScoreOnRow ++;
                        addUniqueObject(cellsToUpdate, {row: cell.row, column : cell.column});
                    }
                });
            }

            let maybeScoreOnCol =0;
            if(colCoordinateToScore.length >= 3 ){
                colCoordinateToScore.forEach(cell => {
                    if(!cell.haveScored){
                        maybeScoreOnCol ++;
                        addUniqueObject(cellsToUpdate, {row: cell.row, column : cell.column});
                    }

                });
            }

            let maybeScoreOnTBD = 0;
            if(topBottomDiagCoordinateToScore.length  >= 3 ){
                topBottomDiagCoordinateToScore.forEach(cell => {
                    if(!cell.haveScored){
                        maybeScoreOnTBD ++;
                        addUniqueObject(cellsToUpdate, {row: cell.row, column : cell.column});
                    }
                });
            }

            let maybeScoreOnBTD = 0;
            if(bottomTopDiagCoordinateToScore.length  >= 3 ){
                bottomTopDiagCoordinateToScore.forEach(cell => {
                    if(!cell.haveScored){
                        maybeScoreOnBTD ++;
                        addUniqueObject(cellsToUpdate, {row: cell.row, column : cell.column});
                    }
                });
            }



            const updateScore = (gameState, maybeScore, coordinateToScore, currentTurn) => {
                if (maybeScore === 4 || (maybeScore === 3 && coordinateToScore.length === 4)) {
                    if (currentTurn === 'player:1') {
                        gameState.player1Score += 2;
                    } else {
                        gameState.player2Score += 2;
                    }
                } else if ((coordinateToScore.length === 4 && maybeScore === 1) || coordinateToScore.length === 3) {
                    if (currentTurn === 'player:1') {
                        gameState.player1Score++;
                    } else {
                        gameState.player2Score++;
                    }
                }
            }

            updateScore(gameState, maybeScoreOnRow, rowCoordinateToScore, gameState.currentTurn);
            updateScore(gameState, maybeScoreOnCol, colCoordinateToScore, gameState.currentTurn);
            updateScore(gameState, maybeScoreOnTBD, topBottomDiagCoordinateToScore, gameState.currentTurn);
            updateScore(gameState, maybeScoreOnBTD, bottomTopDiagCoordinateToScore, gameState.currentTurn);

            cellsToUpdate.forEach(cell => {
                grid[cell.row][cell.column].haveScored = true
            })


            return [gameState, grid]
        }
    },

    utils: {
        // Return game index in global games array by id
        findGameIndexById: (games, idGame) => {
            for (let i = 0; i < games.length; i++) {
                if (games[i].idGame === idGame) {
                    return i; // Retourne l'index du jeu si le socket est trouvé
                }
            }
            return -1;
        },

        findGameIndexBySocketId: (games, socketId) => {
            for (let i = 0; i < games.length; i++) {
                if (games[i].player1Socket.id === socketId || games[i].player2Socket.id === socketId) {
                    return i; // Retourne l'index du jeu si le socket est trouvé
                }
            }
            return -1;
        },

        findDiceIndexByDiceId: (dices, idDice) => {
            for (let i = 0; i < dices.length; i++) {
                if (dices[i].id === idDice) {
                    return i; // Retourne l'index du jeu si le socket est trouvé
                }
            }
            return -1;
        }
    }

}

module.exports = GameService;
