const PRODUCTS_DUMMY_API = "https://dummyjson.com/products";
const RECIPES_DUMMY_API = "https://dummyjson.com/recipes";

interface DummyJsonApi {
  getProducts(): Promise<any>;
  getRecipes(): Promise<any>;
}

class DummyJsonThirdPartyApi implements DummyJsonApi {
  constructor(private productApiUrl: string, private recipeApiUrl: string) {}

  private fetchData = async (url: string): Promise<any> => {
    console.log("fetching from api");
    const response = await fetch(url);
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data;
  };

  getProducts(): Promise<any> {
    return this.fetchData(this.productApiUrl);
  }

  getRecipes(): Promise<any> {
    return this.fetchData(this.recipeApiUrl);
  }
}

class DummyJsonApiProxy implements DummyJsonApi {
  private cachingLayer: Map<string, any> = new Map();

  constructor(private realApi: DummyJsonApi) {}

  async getProducts(): Promise<any> {
    const cacheKey = "products";
    if (this.cachingLayer.has(cacheKey)) {
      console.log("fetching from cache");
      return this.cachingLayer.get(cacheKey);
    }

    const data = await this.realApi.getProducts();
    this.cachingLayer.set(cacheKey, data);
    return data;
  }

  async getRecipes(): Promise<any> {
    const cacheKey = "recipes";
    if (this.cachingLayer.has(cacheKey)) {
      console.log("fetching from cache");
      return this.cachingLayer.get(cacheKey);
    }

    const data = await this.realApi.getRecipes();
    this.cachingLayer.set(cacheKey, data);
    return data;
  }
}

//example usage

const dummyapi = new DummyJsonThirdPartyApi(
  PRODUCTS_DUMMY_API,
  RECIPES_DUMMY_API
);

const proxy = new DummyJsonApiProxy(dummyapi);
(async () => {
  console.log("fetching from api: 1st time...");
  const products = await proxy.getProducts();
  const recipes = await proxy.getRecipes();
  console.log("products: ", products);
  console.log("recipes: ", recipes);
  console.log("fetching from cache: 2nd time...");

  const data = await Promise.all([proxy.getProducts(), proxy.getRecipes()]);
  console.log("data: ", data);
})();
