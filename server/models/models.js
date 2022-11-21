const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  /*  username: {type: DataTypes.STRING, unique:true}, */
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});


const ShopInfo = sequelize.define("shop_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(2048), allowNull: false },
});


const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: {type: DataTypes.INTEGER},
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
 /*  rating: { type: DataTypes.INTEGER, defaultValue: 0 }, */
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Form = sequelize.define("form", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  typeFormId: { type: DataTypes.INTEGER, defaultValue: 0 },
});

/* const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.STRING, allowNull: false },
}); */

const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(2048), allowNull: false },
});

const TypeForm = sequelize.define("type_form", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Orders = sequelize.define('orders', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  complete: {type: DataTypes.BOOLEAN, defaultValue: false},
  mobile: {type: DataTypes.STRING(25), allowNull: false},
  /* username: {type: DataTypes.STRING(25), allowNull: false}, */
  userId: {type: DataTypes.INTEGER, allowNull: true},
})

const OrderProduct = sequelize.define('order_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  productId: {type: DataTypes.INTEGER, allowNull: false},
  orderId: {type: DataTypes.INTEGER, allowNull: false},
  count: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Basket);
Basket.belongsTo(User);

/* User.hasMany(Rating);
Rating.belongsTo(User); */

User.hasMany(Orders);
Orders.belongsTo(User,
    {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
    }
);

Orders.hasMany(OrderProduct);
OrderProduct.belongsTo(Orders,
    {
        foreignKey: { name: 'orderId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);


Form.hasMany(Product);
Product.belongsTo(Form);

/* Product.hasMany(Rating);
Rating.belongsTo(Product); */

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

Type.belongsToMany(Form, {through: TypeForm});
Form.belongsToMany(Type, {through: TypeForm});


module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Form,
   /*  Rating, */
    TypeForm,
    ProductInfo,
    Orders,
    OrderProduct
}
