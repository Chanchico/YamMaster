const {setFinishGameAndWinner} = require("./index.js")
describe("Index test ", () =>{

        it("Player one should be winner", () => {
            const game = {
                gameState:  {
                    currentTurn: 'player:1',
                    timer: null,
                    player1Score: 4,
                    player2Score: 3,
                    player1Token: 0,
                    player2Token: 6,
                    choices: {},
                    deck: {},
                    isFinished: false,
                    winner: null
                }
            }
            const expectedState =  {
                currentTurn: 'player:1',
                timer: null,
                player1Score: 4,
                player2Score: 3,
                player1Token: 0,
                player2Token: 6,
                choices: {},
                deck: {},
                isFinished: true,
                winner: 'player:1'
            }

            const state = setFinishGameAndWinner(game);
            expect(state).toEqual(expectedState)
    } );

    it("Player two should be winner", () => {
        const game = {
            gameState:  {
                currentTurn: 'player:2',
                timer: null,
                player1Score: 1,
                player2Score: 4,
                player1Token: 2,
                player2Token: 0,
                choices: {},
                deck: {},
                isFinished: false,
                winner: null
            }
        }
        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 1,
            player2Score: 4,
            player1Token: 2,
            player2Token: 0,
            choices: {},
            deck: {},
            isFinished: true,
            winner: 'player:2'
        }

        const state = setFinishGameAndWinner(game);
        expect(state).toEqual(expectedState)
    } );


    it("should be draw game", () => {
        const game = {
            gameState:  {
                currentTurn: 'player:2',
                timer: null,
                player1Score: 4,
                player2Score: 4,
                player1Token: 1,
                player2Token: 0,
                choices: {},
                deck: {},
                isFinished: false,
                winner: null
            }
        }
        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 4,
            player2Score: 4,
            player1Token: 1,
            player2Token: 0,
            choices: {},
            deck: {},
            isFinished: true,
            winner: 'draw'
        }

        const state = setFinishGameAndWinner(game);
        expect(state).toEqual(expectedState)
    } );

    it("should do not change anything", () => {
        const game = {
            gameState:  {
                currentTurn: 'player:2',
                timer: null,
                player1Score: 4,
                player2Score: 4,
                player1Token: 1,
                player2Token: 1,
                choices: {},
                deck: {},
                isFinished: false,
                winner: null
            }
        }
        const expectedState =  {
            currentTurn: 'player:2',
            timer: null,
            player1Score: 4,
            player2Score: 4,
            player1Token: 1,
            player2Token: 1,
            choices: {},
            deck: {},
            isFinished: false,
            winner: null
        }

        const state = setFinishGameAndWinner(game);
        expect(state).toEqual(expectedState)
    } );
});