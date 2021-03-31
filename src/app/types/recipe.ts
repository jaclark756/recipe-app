export interface Recipe {
    id?: number;
    userId?: string;
    ingredients?: string[];
    instructions?: string[];
    title?: string;
    photoUrl?: string;
    category?: string;
    cookTime?: number;
    prepTime?: number;
}