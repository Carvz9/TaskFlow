import { imageToBase64 } from "@/lib/gemini";
import { setLatestBase64Image } from "@/lib/imageStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PreviewPage() {
  const { photoUri } = useLocalSearchParams();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  async function handleAnalyze(promptKey) {
    if (!photoUri || isAnalyzing) return;

    try {
      setIsAnalyzing(true);

      const base64Image = await imageToBase64(String(photoUri));
      console.log("Base64 image length:", base64Image.length);

      setLatestBase64Image(base64Image);

      router.push({
        pathname: "/result",
        params: { promptKey },
      });
    } catch (error) {
      console.log("Failed to convert image:", error);
      Alert.alert("Error", "Failed to prepare image for analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: String(photoUri) }} style={styles.preview} />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.back()}
          disabled={isAnalyzing}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.personaColumn}>
        <TouchableOpacity
          style={[styles.analyzeButton, isAnalyzing && styles.disabledButton]}
          onPress={() => handleAnalyze("academic")}
          disabled={isAnalyzing}
        >
          <Text style={styles.buttonText}>
            {isAnalyzing ? "Analyzing..." : "Academic Analysis"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.analyzeButton, isAnalyzing && styles.disabledButton]}
          onPress={() => handleAnalyze("safety")}
          disabled={isAnalyzing}
        >
          <Text style={styles.buttonText}>Safety Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.analyzeButton, isAnalyzing && styles.disabledButton]}
          onPress={() => handleAnalyze("inventory")}
          disabled={isAnalyzing}
        >
          <Text style={styles.buttonText}>Inventory Analysis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  preview: {
    flex: 1,
    resizeMode: "contain",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },

  personaColumn: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },

  retakeButton: {
    backgroundColor: "#5A6472",
    padding: 14,
    borderRadius: 8,
    minWidth: 140,
    alignItems: "center",
  },

  analyzeButton: {
    backgroundColor: "#5B3FA3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});