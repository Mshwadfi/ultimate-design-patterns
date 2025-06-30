const PRODUCTS_DUMMY_API = "https://dummyjson.com/products";
const RECIPES_DUMMY_API = "https://dummyjson.com/recipes";

class DummyThirdPartyApiService {
  constructor(
    private recipeApiUrl: string,
    private productApiUrl: string,
    private cachingLayer: Map<string, string> = new Map()
  ) {}

  fetchData = async (url: string): Promise<any> => {
    if (this.cachingLayer.has(url)) {
      console.log("fetching from cache for : ", url);
      return JSON.parse(this.cachingLayer.get(url)!);
    }
    console.log("fetching from api");
    const response = await fetch(url);
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.cachingLayer.set(url, JSON.stringify(data));

    return data;
  };
  getProducts = async (): Promise<any> => {
    return this.fetchData(this.productApiUrl);
  };
  getRecipes = async (): Promise<any> => {
    return this.fetchData(this.recipeApiUrl);
  };
}

// example usage

(async () => {
  const dummyApiService = new DummyThirdPartyApiService(
    RECIPES_DUMMY_API,
    PRODUCTS_DUMMY_API
  );

  console.log("First fetch (from API)...");
  const products = await dummyApiService.getProducts();
  const recipes = await dummyApiService.getRecipes();
  console.log("Products:", products);
  console.log("Recipes:", recipes);

  console.log("Second fetch (from cache)...");
  const cachedProducts = await dummyApiService.getProducts();
  const cachedRecipes = await dummyApiService.getRecipes();
  console.log("Cached Products:", cachedProducts);
  console.log("Cached Recipes:", cachedRecipes);
})();
