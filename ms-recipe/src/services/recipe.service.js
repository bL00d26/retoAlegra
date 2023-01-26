export function makeRecipeServices({ recipeRepository }) {
  return function recipeServices() {
    async function newRandomRecipe({ kafkaRecipeOrderProducer }) {
      try {
        const recipe = await recipeRepository.getRandomRecipe();
        const message = { recipe };
        await kafkaRecipeOrderProducer({ message });
        return { success: true, data: recipe };
      } catch (error) {
        return { success: false, error };
      }
    }
    async function getRecipes() {
      try {
        const data = await recipeRepository.getRecipes();
        return { success: true, data };
      } catch (error) {
        console.log(error);
        return { success: false, error };
      }
    }
    async function getRecipeById(id) {
      try {
        const data = await recipeRepository.findRecipeById(id);
        return { success: true, data };
      } catch (error) {
        return { success: false, error };
      }
    }
    return {
      newRandomRecipe,
      getRecipes,
      getRecipeById,
    };
  };
}
