import { Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { db } from '@/config/firebase';
import { useRouter } from 'expo-router';
import { DocumentData, WhereFilterOp, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { ScrollView, } from 'react-native';
import { Badge, Surface, Text } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

export default function HomeScreen() {
  const router = useRouter();

  const [byOnChangingRecipe, setOnChangingByRecipe] = React.useState('');
  const [byOnChangingIngredient, setOnChangingByIngredient] = React.useState('');
  const [recipes, setRecipes] = React.useState<DocumentData[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Editable state
  const [isRecipeEditable, setIsRecipeEditable] = React.useState(true);
  const [isIngredientEditable, setIsIngredientEditable] = React.useState(true);

  const [byOnChangingRecipeRequest] = useDebounce(byOnChangingRecipe, 1000);
  const [byOnChangingIngredientRequest] = useDebounce(byOnChangingIngredient, 1000);

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handlePress = (recipe: DocumentData) => {
    router.push({
      pathname: '/recipes/details',
      params: { recipe: JSON.stringify(recipe) }, // Pass recipe data as a string
    });
  };

  const fetchRecipesByAttribute = async (type: string, filter: WhereFilterOp, queryValue: string) => {
    setLoading(true);
    try {
      setRecipes([])
      const q = query(collection(db, 'recipes'), where(type, filter, queryValue));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());
      console.log('results => ', results)
      setRecipes(results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (byOnChangingRecipeRequest) {
      setOnChangingByIngredient('');
      setIsIngredientEditable(false);
      setIsRecipeEditable(true);
      fetchRecipesByAttribute('name', '==', capitalizeFirstLetter(byOnChangingRecipeRequest));
    }
  }, [byOnChangingRecipeRequest]);

  React.useEffect(() => {
    if (byOnChangingIngredientRequest) {
      setOnChangingByRecipe('');
      setIsRecipeEditable(false);
      setIsIngredientEditable(true);
      fetchRecipesByAttribute('tags', 'array-contains', byOnChangingIngredientRequest.toLocaleLowerCase());
    }
  }, [byOnChangingIngredientRequest]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/como-falar-as-comidas-das-principais-refeicoes-do-seu-dia-em-ingles.jpg')}
          style={styles.reactLogo}
          resizeMode="cover"
        />
      }
    >
      <SafeAreaProvider>
        <SafeAreaView>
          {
            (byOnChangingIngredientRequest.length === 0 && recipes.length >= 0) &&
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">O que vamos comer hoje?</ThemedText>
              <ThemedInput
                onChangeText={(text) => setOnChangingByRecipe(text)}
                value={byOnChangingRecipe}
                editable={isRecipeEditable}
                placeholder="Search by recipe name"
                text={byOnChangingRecipe} />
            </ThemedView>
          }

          {
            (byOnChangingRecipeRequest.length === 0 && recipes.length >= 0) &&
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="subtitle">Pesquisar por ingredientes</ThemedText>
              <ThemedInput
                onChangeText={(text) => setOnChangingByIngredient(text)}
                value={byOnChangingIngredient}
                editable={isIngredientEditable}
                placeholder="Search by ingredients"
                text={byOnChangingIngredient} />
            </ThemedView>
          }

          <ScrollView contentContainerStyle={styles.container}>
            {recipes.map((recipe, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(recipe)}>
                <Surface style={styles.card} key={index} elevation={2}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: 'https://i.picsum.photos/id/881/700/700.jpg?hmac=-JqTJ4_Ped2jYmjiaDgYZOAGzvC0CybCKbROT3GJgZc',
                    }}
                  />
                  <Surface style={styles.cardContent}>
                    <Text variant="bold" style={styles.title}>
                      {recipe.name}
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeView}>
                      {recipe.tags.map((tag: string, tagIndex: number) => (
                        <Badge
                          key={tagIndex}
                          style={styles.badge}
                          size={24}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </ScrollView>
                  </Surface>
                </Surface>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    marginHorizontal: 'auto',
    marginVertical: '10%',
    width: '70%',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  reactLogo: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  badgeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  badge: {
    marginRight: 8,
    backgroundColor: '#A1CEDC',
    color: 'white',
  },
});
