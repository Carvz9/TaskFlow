import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ResultPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result Screen</Text>

      <Text style={styles.message}>
        Image was prepared successfully. Gemini analysis will be added in the next commit.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/camera")}>
        <Text style={styles.buttonText}>Take Another Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2A44",
    marginBottom: 12,
  },

  message: {
    fontSize: 16,
    color: "#5A6472",
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#5B3FA3",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});