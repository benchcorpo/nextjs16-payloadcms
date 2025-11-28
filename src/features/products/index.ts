import { Feature } from "../index";
import { seedProducts } from "./seed/products";
import { ProductCategories } from "./collections/ProductCategories";
import { ProductItems } from "./collections/ProductItems";

const feature: Feature = {
    globals: [],
    collections: [ProductCategories, ProductItems],
    seeds: [seedProducts],
};

export default feature;
