const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('../../config/products-68d1f-firebase-adminsdk-hqlln-534e32b480.json')),
});

const db = admin.firestore();

// Load JSON data
const data = JSON.parse(fs.readFileSync('../translated_afrodite_api.json', 'utf8'));

// Function to populate Firestore
async function importRecipes() {
  const recipes = data.recipes;
  
  for (const recipe of recipes) {
    const recipeId = recipe.id; // Ensure 'id' is used as the document ID
    try {
      await db.collection('recipes').doc(recipeId).set(recipe); // Save each recipe
      console.log("Successfully uploaded recipe: ${recipe.name}");
    } catch (error) {
      console.error("Error uploading recipe ${recipe.name}:, error");
    }
  }

  console.log('Data import completed!');
}

// Run the import function
importRecipes();