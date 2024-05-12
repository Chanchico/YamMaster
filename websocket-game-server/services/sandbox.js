const gameService = require("./game.service");

let grid = [
        [
            { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false ,  haveScored : false},
            { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false ,  haveScored : false},
            { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false ,  haveScored : false},
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

let state =  {
    currentTurn: 'player:1',
    timer: null,
    player1Score: 0,
    player2Score: 0,
    choices: {},
    deck: {}
}

const [v1, v2] = gameService.score.checkScore( 0, 2, state, grid);
console.log(v1)
//

// grid = gameService.grid.selectCell('carre', 1, 1, state.currentTurn, grid)
// grid = gameService.grid.selectCell("sec", 1, 2, state.currentTurn, grid)
// grid = gameService.grid.selectCell('full', 1, 3, state.currentTurn, grid)
// grid = gameService.grid.selectCell('full', 2, 1, state.currentTurn, grid)
// grid = gameService.grid.selectCell('defi', 2, 3, state.currentTurn, grid)
// grid = gameService.grid.selectCell('sec', 3, 1, state.currentTurn, grid)
// grid = gameService.grid.selectCell('suite', 3, 2, state.currentTurn, grid)
// grid = gameService.grid.selectCell("moinshuit", 3, 3, state.currentTurn, grid)
// const [v1, v2] = gameService.score.checkScore( 0, 2, state, grid);
//
// state = v1
// grid = v2
//
//
// console.log(state)
// console.log(grid[0])
// console.log()
//
// grid[0][3].owner = 'player:1'
// const [v3, v4] = gameService.score.checkScore( 0, 3, state, grid);
//
// state = v3
// grid = v4
//
// console.log(state)
// console.log(grid[0])

// state.currentTurn = "player:2"
// grid = gameService.grid.selectCell('carre', 1, 1, state.currentTurn, grid)
// grid = gameService.grid.selectCell("sec", 1, 2, state.currentTurn, grid)
// grid = gameService.grid.selectCell('full', 1, 3, state.currentTurn, grid)
// grid = gameService.grid.selectCell('full', 2, 1, state.currentTurn, grid)
// grid = gameService.grid.selectCell('defi', 2, 3, state.currentTurn, grid)
// grid = gameService.grid.selectCell('sec', 3, 1, state.currentTurn, grid)
// grid = gameService.grid.selectCell('suite', 3, 2, state.currentTurn, grid)
// grid = gameService.grid.selectCell("moinshuit", 3, 3, state.currentTurn, grid)
//
// const rowIndex =2;
// const cellIndex = 2;
// const cellId = 'yam';
// grid = gameService.grid.selectCell(cellId, rowIndex, cellIndex, state.currentTurn, grid)
// const [v5, v6] = gameService.score.checkScore( rowIndex, cellIndex, state, grid);
// state = v5
// grid = v6
//
//
// const expectedGrid = [
//     [
//         { viewContent: '1', id: 'brelan1', owner: 'player:1', canBeChecked: false  , haveScored : true},
//         { viewContent: '3', id: 'brelan3', owner: 'player:1', canBeChecked: false  , haveScored : true},
//         { viewContent: 'Défi', id: 'defi', owner: 'player:1', canBeChecked: false  , haveScored : true},
//         { viewContent: '4', id: 'brelan4', owner: 'player:1', canBeChecked: false  , haveScored : true},
//         { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false}],
//     [
//         { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
//         { viewContent: 'Carré', id: 'carre', owner:  'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
//         { viewContent: 'Full', id: 'full', owner:  'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false}],
//     [
//         { viewContent: '≤8', id: 'moinshuit', owner: null, canBeChecked: false  , haveScored : false},
//         { viewContent: 'Full', id: 'full', owner: 'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: 'Yam', id: 'yam', owner: 'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: 'Défi', id: 'defi', owner: 'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: 'Suite', id: 'suite', owner: null, canBeChecked: false  , haveScored : false}],
//     [
//         { viewContent: '6', id: 'brelan6', owner: null, canBeChecked: false  , haveScored : false},
//         { viewContent: 'Sec', id: 'sec', owner:  'player:2', canBeChecked: true  , haveScored : true},
//         { viewContent: 'Suite', id: 'suite', owner:  'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: '≤8', id: 'moinshuit', owner:  'player:2', canBeChecked: false  , haveScored : true},
//         { viewContent: '1', id: 'brelan1', owner: null, canBeChecked: false  , haveScored : false}],
//     [
//         { viewContent: '3', id: 'brelan3', owner: null, canBeChecked: false  , haveScored : false},
//         { viewContent: '2', id: 'brelan2', owner: null, canBeChecked: false  , haveScored : false},
//         { viewContent: 'Carré', id: 'carre', owner: null, canBeChecked: false , haveScored : false },
//         { viewContent: '5', id: 'brelan5', owner: null, canBeChecked: false  , haveScored : false},
//         { viewContent: '4', id: 'brelan4', owner: null, canBeChecked: false  , haveScored : false}]
// ];
// let user = {
//     name :'fran',
//     lastname : "traversi"
// }
//
// let user1 = {
//     name :'fran',
//     lastname : "traversi"
// }
//
// const arr = [user]
//
// console.log(_.includes(arr, user1))
// //
// // console.log(user)
// //
// // function changeName(user, name){
// //     user.name = name
// // }
// //
// // changeName('truc')
// // console.log(user)
//
