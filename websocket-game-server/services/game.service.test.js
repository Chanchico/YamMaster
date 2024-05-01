const gameService= require("./game.service");
const GameService = require("./game.service");




describe('checkScore function', () => {
    let state = {
        currentTurn: 'player:1',
        timer: null,
        player1Score: 0,
        player2Score: 0,
        choices: {},
        deck: {}
    }
    let grid = [
        [
            { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false ,  haveScored : false},
            { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false ,  haveScored : false},
            { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false ,  haveScored : false}],
        [
            { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: true ,  haveScored : false},
            { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false ,  haveScored : false}],
        [
            { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Yam', id: 'yam', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false ,  haveScored : false}],
        [
            { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: true ,  haveScored : false},
            { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false ,  haveScored : false}],
        [
            { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false ,  haveScored : false},
            { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false ,  haveScored : false}]
    ];
    it('Player1 scored 1', () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:1',
            timer: null,
            player1Score: 1,
            player2Score: 0,
            choices: {},
            deck: {}
        }
        const rowIndex = 0;
        const cellIndex = 2;
        const cellId = 'defi';

        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2


        expect(state).toEqual(expectedState);
        expect(grid).toEqual(expectedGrid)
    });

    it('Player1 scored 2', () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner: null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:1',
            timer: null,
            player1Score: 2,
            player2Score: 0,
            choices: {},
            deck: {}
        }
        const rowIndex = 0;
        const cellIndex = 3;
        const cellId = 'brelan4';

        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2


        expect(state).toEqual(expectedState);
        expect(grid).toEqual(expectedGrid)
    });

    it('Player2 scored 1', () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 2,
            player2Score: 1,
            choices: {},
            deck: {}
        }

        grid = gameService.grid.selectCell('carre', 1, 1, "player:2", grid)
        //grid = gameService.grid.selectCell("sec", 1, 2, "player:2", grid)
        // grid = gameService.grid.selectCell('full', 1, 3, "player:2", grid)
        // grid = gameService.grid.selectCell('full', 2, 1, "player:2", grid)
        // grid = gameService.grid.selectCell('defi', 2, 3, "player:2", grid)
        // grid = gameService.grid.selectCell('sec', 3, 1, "player:2", grid)
        // grid = gameService.grid.selectCell('suite', 3, 2, "player:2", grid)
        grid = gameService.grid.selectCell("moinshuit", 3, 3,"player:2", grid)

        const rowIndex =2;
        const cellIndex = 2;
        const cellId = 'yam';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2

        // expect(state).toEqual(expectedState);
        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });

    it('Player2 add token on defi [2, 3], should not score 1', () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 2,
            player2Score: 1,
            choices: {},
            deck: {}
        }

        const rowIndex =2;
        const cellIndex = 3;
        const cellId = 'defi';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2

        // expect(state).toEqual(expectedState);
        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });

    it('Player2 should score 1 more on full [1, 3] position', () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 2,
            player2Score: 2,
            choices: {},
            deck: {}
        }

        const rowIndex =1;
        const cellIndex = 3;
        const cellId = 'full';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2

        // expect(state).toEqual(expectedState);
        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });

    it('Player2 should score 1 more on sec [1, 2] position ', () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 2,
            player2Score: 3,
            choices: {},
            deck: {}
        }

        const rowIndex =1;
        const cellIndex = 2;
        const cellId = 'sec';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2

        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });


    it("Player1 shouldn't score att positioning on brelan2 [1, 0] ", () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: 'player:1', canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:1',
            timer: null,
            player1Score: 2,
            player2Score: 3,
            choices: {},
            deck: {}
        }

        const rowIndex =1;
        const cellIndex = 0;
        const cellId = 'brelan2';
        state.currentTurn = "player:1"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2

        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });

    it("Player1 shouldn't score att positioning on brelan6 [3, 0] ", () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: 'player:1', canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: 'player:1', canBeChecked: false  , haveScored : false},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:1',
            timer: null,
            player1Score: 2,
            player2Score: 3,
            choices: {},
            deck: {}
        }

        const rowIndex =3;
        const cellIndex = 0;
        const cellId = 'brelan6';
        state.currentTurn = "player:1"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        grid = v2

        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });
});
