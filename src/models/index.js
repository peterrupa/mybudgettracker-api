import UserModel from './user';
import CategoryModel from './category';
import TransactionModel from './transaction';
import CashModel from './cash';

UserModel.hasMany(CategoryModel);
UserModel.hasMany(TransactionModel);
TransactionModel.belongsTo(CategoryModel, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
TransactionModel.belongsTo(UserModel, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
UserModel.hasOne(CashModel, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

export const User = UserModel;
export const Category = CategoryModel;
export const Transaction = TransactionModel;
export const Cash = CashModel;
