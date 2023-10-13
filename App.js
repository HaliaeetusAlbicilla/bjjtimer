import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";

import { Audio } from "expo-av";
import { styles } from "./AppStyles";
// import Sound from "react-native-sound";

const App = () => {
  const [matTime, setMatTime] = useState(5);
  const [breakTime, setBreakTime] = useState(1);
  const [remainingTime, setRemainingTime] = useState(matTime * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [timerOn, setTimerOn] = useState(false);

  const workImage = require("./assets/bjj_fight.jpeg");
  const breakImage = require("./assets/break.jpg");

  const [sound, setSound] = useState(null);

  async function playSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("./assets/bell.wav")
    );
    setSound(newSound);
    await newSound.playAsync();
  }

  useEffect(() => {
    if (!timerOn) {
      setRemainingTime(matTime * 60);
    }
  }, [matTime]);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          playSound();
          if (onBreak) {
            setOnBreak(false);
            setRemainingTime(matTime * 60);
          } else {
            setOnBreak(true);
            setRemainingTime(breakTime * 60);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, remainingTime, onBreak]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={onBreak ? breakImage : workImage}
      ></Image>
      <Text style={styles.label}>Mat Time (minutes):</Text>
      <View style={styles.buttonGroup}>
        <Button
          title="-"
          onPress={() => setMatTime((prev) => Math.max(1, prev - 1))}
        />
        <Text style={styles.timerValue}>{matTime}</Text>
        <Button
          title="+"
          onPress={() => setMatTime((prev) => Math.min(10, prev + 1))}
        />
      </View>

      <Text style={styles.label}>Break Time (minutes):</Text>
      <View style={styles.buttonGroup}>
        <Button
          title="-"
          onPress={() => setBreakTime((prev) => Math.max(1, prev - 1))}
        />
        <Text style={styles.timerValue}>{breakTime}</Text>
        <Button
          title="+"
          onPress={() => setBreakTime((prev) => Math.min(10, prev + 1))}
        />
      </View>

      <Text style={styles.timer}>
        {Math.floor(remainingTime / 60)}:
        {String(remainingTime % 60).padStart(2, "0")}
      </Text>

      <Button
        title={timerOn ? "Pause" : "Start"}
        onPress={() => setTimerOn(!timerOn)}
      />
    </View>
  );
};

export default App;
