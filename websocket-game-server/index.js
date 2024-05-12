const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var uniqid = require('uniqid');
const GameService = require('./services/game.service');

// ---------------------------------------------------
// -------- CONSTANTS AND GLOBAL VARIABLES -----------
// ---------------------------------------------------
let games = [];
let queue = [];

// ------------------------------------
// -------- EMITTER METHODS -----------
// ------------------------------------

const updateClientsViewTimers = (game) => {
  game.player1Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:1', game.gameState));
  game.player2Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:2', game.gameState));
};

 const updateClientsViewScoresAndTokens = (game) => {
  game.player1Socket.emit('game.scoreAndToken', {
    score: game.gameState.player1Score,
    token: game.gameState.player1Token
  });
  game.player2Socket.emit('game.scoreAndToken', {
    score: game.gameState.player2Score,
    token: game.gameState.player2Token
  });
};

const updateClientsViewDecks = (game) => {
  setTimeout(() => {
    game.player1Socket.emit('game.deck.view-state', GameService.send.forPlayer.deckViewState('player:1', game.gameState));
    game.player2Socket.emit('game.deck.view-state', GameService.send.forPlayer.deckViewState('player:2', game.gameState));
  }, 200);
};

const updateClientsViewChoices = (game) => {
  setTimeout(() => {
    game.player1Socket.emit('game.choices.view-state', GameService.send.forPlayer.choicesViewState('player:1', game.gameState));
    game.player2Socket.emit('game.choices.view-state', GameService.send.forPlayer.choicesViewState('player:2', game.gameState));
  }, 200);
}

const updateClientsViewGrid = (game) => {
  setTimeout(() => {
    game.player1Socket.emit('game.grid.view-state', GameService.send.forPlayer.gridViewState('player:1', game.gameState));
    game.player2Socket.emit('game.grid.view-state', GameService.send.forPlayer.gridViewState('player:2', game.gameState));
  }, 200)
}
const handleButtonDefi = (game, player, activate) => {
  if(player === "player:1"){
    game.player1Socket.emit('game.defi.activate', {activate : activate})
  }
  else {
    game.player2Socket.emit('game.defi.activate', {activate : activate})
  }
}


const setFinishGameAndWinner = (game) => {
  if (game.gameState.player1Token === 0 || game.gameState.player2Token === 0 ) {
    game.gameState.isFinished = true;
    if (game.gameState.player1Score > game.gameState.player2Score){
      game.gameState.winner = "player:1"
    } else if (game.gameState.player2Score > game.gameState.player1Score) {
      game.gameState.winner = "player:2"
    }
    else {
      game.gameState.winner = 'draw'
    }
  }
  return game.gameState
}
const notifyEndGame = (game)=> {
    if(game.gameState.winner === "player:1"){
      game.player1Socket.emit('game.game.end',
          {message : "congratulations you have won",
          youScore: game.gameState.player1Score, opponentScore: game.gameState.player2Score } )

      game.player2Socket.emit('game.game.end',
          {message : "You lost",
            youScore: game.gameState.player2Score, opponentScore: game.gameState.player1Score } )


    } else if (game.gameState.winner === "player:2") {
      game.player2Socket.emit('game.game.end',
          {message : "congratulations you have won",
            youScore: game.gameState.player2Score, opponentScore: game.gameState.player1Score } )

      game.player1Socket.emit('game.game.end',
          {message : "You lost",
            youScore: game.gameState.player1Score, opponentScore: game.gameState.player2Score } )

    } else {
      game.player1Socket.emit('game.game.end',
          {message : "Draw",
            youScore: game.gameState.player1Score, opponentScore: game.gameState.player2Score } )
      game.player2Socket.emit('game.game.end',
          {message : "Draw",
            youScore: game.gameState.player2Score, opponentScore: game.gameState.player1Score } )
    }
}

const destroyGame = (game) => {
  const gameIndex = GameService.utils.findGameIndexById(games, game)
  if (gameIndex !== -1) {
    games.splice(gameIndex, 1);
  }
};

module.exports = { setFinishGameAndWinner };
// ---------------------------------
// -------- GAME METHODS -----------
// ---------------------------------

const createGame = (player1Socket, player2Socket) => {

  // init objet (game) with this first level of structure:
  // - gameState : { .. evolutive object .. }
  // - idGame : just in case ;)
  // - player1Socket: socket instance key "joueur:1"
  // - player2Socket: socket instance key "joueur:2"
  const newGame = GameService.init.gameState();
  newGame['idGame'] = uniqid();
  newGame['player1Socket'] = player1Socket;
  newGame['player2Socket'] = player2Socket;

  // push game into 'games' global array
  games.push(newGame);

  // const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);/

  // just notifying screens that game is starting
  newGame.player1Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:1', newGame));
  newGame.player2Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:2', newGame));

  // we update views
  updateClientsViewTimers(newGame);
  updateClientsViewDecks(newGame);
  updateClientsViewGrid(newGame);
  updateClientsViewScoresAndTokens(newGame);
  // timer every second
  if (!newGame.gameState.isFinished){
    const gameInterval = setInterval(() => {

      // timer variable decreased
      newGame.gameState.timer--;

      // emit timer to both clients every seconds
      updateClientsViewTimers(newGame);

      // if timer is down to 0, we end turn
      if (newGame.gameState.timer === 0) {
        handleButtonDefi(newGame, newGame.gameState.currentTurn, false)
        newGame.gameState.isDefi = false
        // switch currentTurn variable
        newGame.gameState.currentTurn = newGame.gameState.currentTurn === 'player:1' ? 'player:2' : 'player:1';

        // reset timer
        newGame.gameState.timer = GameService.timer.getTurnDuration();

        // reset deck / choices / grid states
        newGame.gameState.deck = GameService.init.deck();
        newGame.gameState.choices = GameService.init.choices();
        newGame.gameState.grid = GameService.grid.resetcanBeCheckedCells(newGame.gameState.grid);

        // reset views also
        updateClientsViewTimers(newGame);
        updateClientsViewDecks(newGame);
        updateClientsViewChoices(newGame);
        updateClientsViewGrid(newGame);
      }

    }, 1000);


  // remove intervals at deconnection
  player1Socket.on('disconnect', () => {
    clearInterval(gameInterval);
  });

  player2Socket.on('disconnect', () => {
    clearInterval(gameInterval);
  });
  }
};

const newPlayerInQueue = (socket) => {

  queue.push(socket);

  // 'queue' management
  if (queue.length >= 2) {
    const player1Socket = queue.shift();
    const player2Socket = queue.shift();
    createGame(player1Socket, player2Socket);
  }
  else {
    socket.emit('queue.added', GameService.send.forPlayer.viewQueueState());
  }
};

// ---------------------------------------
// -------- SOCKETS MANAGEMENT -----------
// ---------------------------------------

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);

  socket.on('queue.join', () => {
    console.log(`[${socket.id}] new player in queue `)
    newPlayerInQueue(socket);
  });

  socket.on('game.dices.roll', () => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    console.log(games[gameIndex].gameState.deck.rollsCounter)

    if (games[gameIndex].gameState.deck.rollsCounter === 2) {
      handleButtonDefi(games[gameIndex], games[gameIndex].gameState.currentTurn, false)
    }
    // if not last throw
    if (games[gameIndex].gameState.deck.rollsCounter < games[gameIndex].gameState.deck.rollsMaximum) {

      // dices management
      games[gameIndex].gameState.deck.dices = GameService.dices.roll(games[gameIndex].gameState.deck.dices);
      games[gameIndex].gameState.deck.rollsCounter++;

    }
    // if last throw
    else {

      // dices management
      games[gameIndex].gameState.deck.dices = GameService.dices.roll(games[gameIndex].gameState.deck.dices);
      games[gameIndex].gameState.deck.rollsCounter++;
      games[gameIndex].gameState.deck.dices = GameService.dices.lockEveryDice(games[gameIndex].gameState.deck.dices);

      // temporary put timer at 5 sec to test turn switching
      games[gameIndex].gameState.timer = 5;
    }

    // combinations management
    const dices = games[gameIndex].gameState.deck.dices;
    const isDefi = games[gameIndex].gameState.isDefi;

    const isSec = games[gameIndex].gameState.deck.rollsCounter === 2;
    if (games[gameIndex].gameState.deck.rollsCounter === 2) {
      handleButtonDefi(games[gameIndex], games[gameIndex].gameState.currentTurn, true)
    }

    const combinations = GameService.choices.findCombinations(dices, isDefi, isSec);
    games[gameIndex].gameState.choices.availableChoices = combinations;

    console.log(combinations)
    // emit to views new state
    updateClientsViewDecks(games[gameIndex]);
    updateClientsViewChoices(games[gameIndex]);

  });

  socket.on("game.defi.activated", () => {
    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    games[gameIndex].gameState.isDefi = true
    handleButtonDefi(games[gameIndex],games[gameIndex].gameState.currentTurn, false )
  })
  socket.on('game.dices.lock', (idDice) => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    const indexDice = GameService.utils.findDiceIndexByDiceId(games[gameIndex].gameState.deck.dices, idDice);

    // reverse flag 'locked'
    games[gameIndex].gameState.deck.dices[indexDice].locked = !games[gameIndex].gameState.deck.dices[indexDice].locked;

    updateClientsViewDecks(games[gameIndex]);
  });

  socket.on('game.choices.selected', (data) => {

    // gestion des choix
    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    games[gameIndex].gameState.choices.idSelectedChoice = data.choiceId;

    // gestion de la grid
    games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid);
    games[gameIndex].gameState.grid = GameService.grid.updateGridAfterSelectingChoice(data.choiceId, games[gameIndex].gameState.grid);

    updateClientsViewChoices(games[gameIndex]);
    updateClientsViewGrid(games[gameIndex]);
  });

  socket.on('game.grid.selected', (data) => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);

    games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid);
    games[gameIndex].gameState.grid = GameService.grid.selectCell(data.cellId, data.rowIndex, data.cellIndex, games[gameIndex].gameState.currentTurn, games[gameIndex].gameState.grid);
    games[gameIndex].gameState = GameService.choices.decrementToken(games[gameIndex].gameState)
    GameService.score.checkScore(data.rowIndex, data.cellIndex, games[gameIndex].gameState, games[gameIndex].gameState.grid  )

    setFinishGameAndWinner(games[gameIndex])
    if (games[gameIndex].gameState.isFinished) {
      notifyEndGame(games[gameIndex])
      destroyGame(games[gameIndex].idGame)
      return
    }
    handleButtonDefi(games[gameIndex], games[gameIndex].gameState.currentTurn , false)
    games[gameIndex].gameState.isDefi = false

    games[gameIndex].gameState.currentTurn = games[gameIndex].gameState.currentTurn === 'player:1' ? 'player:2' : 'player:1';
    games[gameIndex].gameState.timer = GameService.timer.getTurnDuration();

    games[gameIndex].gameState.deck = GameService.init.deck();
    games[gameIndex].gameState.choices = GameService.init.choices();

    games[gameIndex].player1Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:1', games[gameIndex].gameState));
    games[gameIndex].player2Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:2', games[gameIndex].gameState));

    updateClientsViewScoresAndTokens(games[gameIndex])
    updateClientsViewDecks(games[gameIndex]);
    updateClientsViewChoices(games[gameIndex]);
    updateClientsViewGrid(games[gameIndex]);
  });



  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

// -----------------------------------
// -------- SERVER METHODS -----------
// -----------------------------------

app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});
