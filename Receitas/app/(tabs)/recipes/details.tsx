import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RecipeDetailsScreen() {
  const { recipe } = useLocalSearchParams(); // Retrieve recipe data
  const parsedRecipe = recipe ? JSON.parse(recipe as string) : null; // Parse recipe data

  if (!parsedRecipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipe not found</Text>
      </View>
    );
  }

  console.log('parsedRecipe => ', parsedRecipe)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedRecipe.name}</Text>

      <Text style={styles.title}>{parsedRecipe.section[0].name}</Text>
      {parsedRecipe.section[0].content.map((tag: string, index: number) => (
        <Text key={index} style={styles.tag}>
          {tag}
        </Text>
      ))}

      {parsedRecipe.section[1].content.map((tag: string, index: number) => (
        <Text key={index} style={styles.tag}>
          {tag}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tag: {
    fontSize: 16,
    color: 'gray',
  },
});
