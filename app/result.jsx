import { analyzeImage } from "@/lib/gemini";
import { getLatestBase64Image } from "@/lib/imageStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ANALYSIS_PROMPT = `
Analyze this image. Identify:
1. Objects - list the distinct physical objects you see
2. Context - briefly describe the setting or scene
3. Activities - what activity appears to be happening, if any
4. Recommendations - one practical suggestion based on the scene

Respond ONLY with valid JSON in this exact shape, no extra text:
{
  "objects": ["...", "..."],
  "context": "...",
  "activities": "...",
  "recommendations": "..."
}
`;

export default function ResultPage() {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runAnalysis();
  }, []);

  async function runAnalysis() {
    setLoading(true);
    setError(null);

    try {
      const base64Image = getLatestBase64Image();

      if (!base64Image) {
        throw new Error("No image found. Please take another photo.");
      }

      const result = await analyzeImage(base64Image, ANALYSIS_PROMPT);

      const textPart = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textPart) {
        console.log("Gemini full response:", result);
        throw new Error("Empty response from Gemini.");
      }

      console.log("Gemini text response:", textPart);

const cleanText = textPart
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

console.log("Cleaned Gemini response:", cleanText);

const parsedAnalysis = JSON.parse(cleanText);
setAnalysis(parsedAnalysis);
    } catch (err) {
  console.log("Analysis error:", err);
  setError(err.message || "Could not analyze this image. Please try again.");
} finally {
  setLoading(false);
}
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5B3FA3" />
        <Text style={styles.loadingText}>Analyzing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/camera")}>
          <Text style={styles.buttonText}>Take Another Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Image Analysis</Text>

      <Text style={styles.sectionTitle}>Objects</Text>
      {analysis.objects.map((obj, index) => (
        <Text key={index} style={styles.listItem}>
          • {obj}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Context</Text>
      <Text style={styles.bodyText}>{analysis.context}</Text>

      <Text style={styles.sectionTitle}>Activities</Text>
      <Text style={styles.bodyText}>{analysis.activities}</Text>

      <Text style={styles.sectionTitle}>Recommendations</Text>
      <Text style={styles.bodyText}>{analysis.recommendations}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/camera")}>
        <Text style={styles.buttonText}>Take Another Photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  centered: {
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
    marginBottom: 10,
  },

  loadingText: {
    marginTop: 12,
    color: "#5A6472",
  },

  errorText: {
    color: "#B3261E",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    color: "#1F2A44",
  },

  listItem: {
    fontSize: 15,
    marginTop: 4,
    color: "#2B2F38",
  },

  bodyText: {
    fontSize: 15,
    marginTop: 4,
    color: "#2B2F38",
  },

  button: {
    backgroundColor: "#5B3FA3",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 40,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});