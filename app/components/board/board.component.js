import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet } from 'react-native';
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import PlayerTimer from "./timers/player-timer.component";
import OpponentTimer from "./timers/opponent-timer.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import {SocketContext} from "../../contexts/socket.context";

const OpponentInfos = () => {
  return (
    <View style={styles.opponentInfosContainer}>
      <Text>Opponent infos</Text>
    </View>
  );
};

const OpponentScore = () => {
  return (
    <View style={styles.opponentScoreContainer}>
      <Text>Score: </Text>
    </View>
  );
};

const PlayerInfos = () => {
  return (
    <View style={styles.playerInfosContainer}>
      <Text>Player Infos</Text>
    </View>
  );
};

const PlayerScore = ({ token, score }) => {
  return (
      <View style={styles.playerScoreContainer}>
        <Text>Token: {token}</Text>
        <Text>Score: {score}</Text>
      </View>
  );
};

const Board = ({ gameViewState }) => {
  const [playerToken, setPlayerToken] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const socket = useContext(SocketContext);
  useEffect(() => {

    socket.on('game.scoreAndToken', ({ score, token }) => {
      setPlayerScore(score);
      setPlayerToken(token);
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <View style={styles.container}>
        <View style={[styles.row, { height: '5%' }]}>
          <OpponentInfos />
          <View style={styles.opponentTimerScoreContainer}>
            <OpponentTimer />
            <OpponentScore />
          </View>
        </View>

        <View style={[styles.row, { height: '25%' }]}>
          <OpponentDeck />
        </View>

        <View style={[styles.row, { height: '40%' }]}>
          <Grid />
          <Choices />
        </View>

        <View style={[styles.row, { height: '25%' }]}>
          <PlayerDeck />
        </View>

        <View style={[styles.row, { height: '5%' }]}>
          <PlayerScore token={playerToken} score={playerScore} /> {/* Pass token and score as props */}
          <View style={styles.playerTimerScoreContainer}>
            <PlayerTimer />
          </View>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  opponentInfosContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
    backgroundColor: "lightgrey"
  },
  opponentTimerScoreContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
  opponentTimerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opponentScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckOpponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black"
  },
  gridContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
  },
  choicesContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
  deckPlayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  playerInfosContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
    backgroundColor: "lightgrey"
  },
  playerTimerScoreContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
  playerTimerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
  playerScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
});

export default Board;
