import UserModel from './user';
import CategoryModel from './category';

UserModel.hasMany(CategoryModel);

export const User = UserModel;
export const Category = CategoryModel;
