import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "black",
  },
  label: {
    fontSize: 18,
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  timerValue: {
    width: 50,
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  timer: {
    fontSize: 68,
    margin: 15,
    color: "white",
  },
  imageStyle: {
    width: "100%",
    height: "40%",
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 0,
  },
});
