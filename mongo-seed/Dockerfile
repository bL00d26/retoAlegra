FROM mongo
WORKDIR /seed
COPY . .
#seeding ingredients and recipes
CMD mongoimport --host db --db restaurant --collection ingredients --type json --file ./ingredients.json --jsonArray && mongoimport --host db --db restaurant --collection recipes --type json --file ./recipes.json --jsonArray