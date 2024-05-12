const gameService= require("./game.service");

describe('checkScore function', () => {
    let state = {
        currentTurn: 'player:1',
        timer: null,
        player1Score: 0,
        player2Score: 0,
        player1Token: 12,
        player2Token: 12,
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
    it('Player1 scored 1 at positioning on 0, 2', () => {
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
            player1Token: 9,
            player2Token: 12,
            choices: {},
            deck: {}
        }
        state = gameService.choices.decrementToken(state)
        state = gameService.choices.decrementToken(state)
        const rowIndex = 0;
        const cellIndex = 2;
        const cellId = 'defi';

        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        state = gameService.choices.decrementToken(state)
        grid = v2


        expect(state).toEqual(expectedState);
        expect(grid).toEqual(expectedGrid)
    });

    it('Player1 scored 2 at positioning on 0, 3', () => {
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
            player1Token: 8,
            player2Token: 12,
            choices: {},
            deck: {}
        }
        const rowIndex = 0;
        const cellIndex = 3;
        const cellId = 'brelan4';

        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [v1, v2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = v1
        state = gameService.choices.decrementToken(state)
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
            player1Token: 8,
            player2Token: 9,
            choices: {},
            deck: {}
        }
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell('carre', 1, 1, "player:2", grid)
        const [s0, g0] = gameService.score.checkScore( 1, 1, state, grid);
        state = s0
        grid = g0
        state = gameService.choices.decrementToken(state)

        grid = gameService.grid.selectCell("moinshuit", 3, 3,"player:2", grid)
        const [s1, g1] = gameService.score.checkScore( 3, 3, state, grid);
        state = s1
        grid = g1
        state = gameService.choices.decrementToken(state)

        const rowIndex =2;
        const cellIndex = 2;
        const cellId = 'yam';

        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        const [s2, g2] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s2
        grid = g2
        state = gameService.choices.decrementToken(state)

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
            player1Token: 8,
            player2Token: 8,
            choices: {},
            deck: {}
        }

        const rowIndex =2;
        const cellIndex = 3;
        const cellId = 'defi';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

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
            player1Token: 8,
            player2Token: 7,
            choices: {},
            deck: {}
        }

        const rowIndex =1;
        const cellIndex = 3;
        const cellId = 'full';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

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
            player1Token: 8,
            player2Token: 6,
            choices: {},
            deck: {}
        }

        const rowIndex =1;
        const cellIndex = 2;
        const cellId = 'sec';
        state.currentTurn = "player:2"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

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
            player1Token: 7,
            player2Token: 6,
            choices: {},
            deck: {}
        }

        const rowIndex =1;
        const cellIndex = 0;
        const cellId = 'brelan2';
        state.currentTurn = "player:1"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

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
            player1Token: 6,
            player2Token: 6,
            choices: {},
            deck: {}
        }

        const rowIndex =3;
        const cellIndex = 0;
        const cellId = 'brelan6';
        state.currentTurn = "player:1"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });

    it("Player1 should score 2 more point att positioning on brelan6 [2, 0] ", () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: "player:1", canBeChecked: false  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: 'player:1', canBeChecked: false  , haveScored : true},
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
            player1Score: 4,
            player2Score: 3,
            player1Token: 5,
            player2Token: 6,
            choices: {},
            deck: {}
        }

        const rowIndex =2;
        const cellIndex = 0;
        const cellId = 'moinshuit';
        state.currentTurn = "player:1"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });


    it("Player1 should win ", () => {
        const expectedGrid = [
            [
                { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '2', id: 'brelan2', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '≤8', id: 'moinshuit', owner: "player:1", canBeChecked: false  , haveScored : true},
                { viewContent: 'Full', id: 'full', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '6', id: 'brelan6', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: 'Sec', id: 'sec', owner:  null, canBeChecked: true  , haveScored : false},
                { viewContent: 'Suite', id: 'suite', owner:  null, canBeChecked: false  , haveScored : false},
                { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
                { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
            [
                { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
                { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
                { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
                { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
        ];

        const expectedState =  {
            currentTurn: 'player:1',
            timer: null,
            player1Score: 4,
            player2Score: 3,
            player1Token: 4,
            player2Token: 6,
            choices: {},
            deck: {},
            isFinished: true,
            winner: 'player:1'
        }

        const rowIndex =4;
        const cellIndex = 0;
        const cellId = 'brelan3';
        state.currentTurn = "player:1"
        grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
        state = gameService.choices.decrementToken(state)
        const [s0, g0] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
        state = s0
        grid = g0

        expect(grid).toEqual(expectedGrid)
        expect(state).toEqual(expectedState)
    });
});
