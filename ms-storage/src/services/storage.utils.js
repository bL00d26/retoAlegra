import axios from 'axios';

export function getMissingIngredients({ ingredientsFromDb, recipeIngredients }) {
  const missingIngredients = ingredientsFromDb.reduce((acc, { _id, name, stock }) => {
    const ingredientId = _id.toString();
    const { quantity } = recipeIngredients.find(
      ({ ingredient: recipeId }) => recipeId === ingredientId.toString(),
    );
    const neededQuantity = stock - quantity;
    if (neededQuantity < 0) {
      return [...acc, {
        ingredientId,
        name: name.toLowerCase(),
        neededQuantity: Math.abs(neededQuantity),
      }];
    }
    return [...acc];
  }, []);
  return missingIngredients;
}

export async function buyMissingIngredients({ missingIngredients }) {
  const boughtIngredients = [];
  const buyRecords = [];
  const mappedMissingIngredients = missingIngredients.map(
    (ingredient) => ({ ...ingredient, boughtQuantity: 0 }),
  );
  async function apiCall(currentMissingIngredients = mappedMissingIngredients) {
    console.log(`Comprando ingredientes faltantes: ${JSON.stringify(currentMissingIngredients)}`);
    const promises = currentMissingIngredients.map(
      ({ name }) => axios
        .get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${name}`),
    );
    const buyResult = await Promise.all(promises);
    const mappedResults = buyResult.map(({ data, request }) => {
      const { quantitySold } = data;
      const { path } = request;
      const ingredientName = path.split('=')[1];
      const { ingredientId } = currentMissingIngredients.find(
        ({ name }) => name === ingredientName,
      );
      buyRecords.push({ quantitySold, ingredientId });
      return { quantitySold, ingredientName };
    });
    const currentMissing = currentMissingIngredients.reduce((acc, ingredient) => {
      const { name, neededQuantity, boughtQuantity } = ingredient;
      const { quantitySold } = mappedResults.find(({ ingredientName }) => ingredientName === name);
      const newQuantity = quantitySold + boughtQuantity;
      const condition = newQuantity >= neededQuantity;
      if (condition) {
        boughtIngredients.push({
          ...ingredient,
          boughtQuantity: quantitySold + boughtQuantity,
        });
        return [...acc];
      }
      return [...acc, { ...ingredient, boughtQuantity: newQuantity }];
    }, []);
    if (currentMissing.length) {
      await apiCall(currentMissing);
    }
  }
  await apiCall();
  return { boughtIngredients, buyRecords };
}
