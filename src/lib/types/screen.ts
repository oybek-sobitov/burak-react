import { Member } from "./member";
import { Product } from "./product";

// REACT APP STATE
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPage;
}

// HOMEPAGE
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

// PRODUCTS PAGE
export interface ProductsPage {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

// ORDERS PAGE