import ParallaxScrollView from '@/components/ParallaxScrollView';
import { db } from '@/config/firebase';
import { useRouter } from 'expo-router';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Surface, Text } from 'react-native-paper';

export default function RecipesScreen() {
  const [recipes, setRecipes] = React.useState<DocumentData[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      setRecipes(querySnapshot.docs.map((doc: { data: () => any }) => doc.data()));
    })();
  }, []);

  const handlePress = (recipe: DocumentData) => {
    router.push({
      pathname: '/recipes/details',
      params: { recipe: JSON.stringify(recipe) }, // Pass recipe data as a string
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/como-falar-as-comidas-das-principais-refeicoes-do-seu-dia-em-ingles.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >
      <ScrollView contentContainerStyle={styles.container}>
        {recipes.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(recipe)}>
            <Surface style={styles.card} elevation={2}>
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
                    <Badge key={tagIndex} style={styles.badge} size={24}>
                      {tag}
                    </Badge>
                  ))}
                </ScrollView>
              </Surface>
            </Surface>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerImage: {
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
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    marginRight: 8,
    backgroundColor: '#A1CEDC',
    color: 'white',
  },
});
