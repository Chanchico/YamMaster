import React from 'react';
import { View, Text, Button } from 'react-native';

const EndGameNotification = ({ gameState }) => {
    let message;
    if (gameState.winner === "player:1") {
        message = `Congratulations, you won! Your score: ${gameState.player1Score}, Opponent's score: ${gameState.player2Score}`;
    } else if (gameState.winner === "player:2") {
        message = `You lost. Your score: ${gameState.player2Score}, Opponent's score: ${gameState.player1Score}`;
    } else {
        message = `It's a draw. Your score: ${gameState.player1Score}, Opponent's score: ${gameState.player2Score}`;
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text>{message}</Text>
            <Button title="Back to Home Screen" onPress={navigation.navigate('HomeScreen')} />
        </View>
    );
};

export default EndGameNotification;