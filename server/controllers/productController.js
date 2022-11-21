const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo,Type, Form, OrderProduct, BasketProduct } = require("../models/models");
const ApiError = require("../error/error");
class productController {
  async create(req, res, next) {
    try {
      let { name, price, info, typeId, formId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        info,
        typeId,
        formId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        );
      }
      console.log(img)
      return res.json(product);
    } catch (e) {
      next(ApiError.errorRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { typeId, formId, limit, page } = req.query;
  
    page = page || 1;
    limit = +limit || 9;
    let offset = page * limit - limit;
    let products;
    if (!typeId && !formId) {
      products = await Product.findAndCountAll({ limit, offset });
    }
    if (typeId && !formId) {
      products = await Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (!typeId && formId) {
      products = await Product.findAndCountAll({
        where: { formId },
        limit,
        offset,
      });
    }
    if (typeId && formId) {

      products = await Product.findAndCountAll({
        where: { formId, typeId },
        limit,
        offset,
      });
    }
    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [
      { model: ProductInfo, as: "info" },
      {model: Type},
      {model: Form}
    ],
    });
    return res.json(product);

    
  }

  async getFiltered(req, res) {
    let { name } = req.query;
    
      products = await Product.findAll({
        where: {
           name: name 
         },
      
      })
      products.forEach((name)=>{
        name = name.toUpperCase()
      })
     
    return res.json(products);
  }


  async updateProduct(req, res) {
    try {
        const {id} = req.params;
        const {formId, typeId, name, price, info} = req.body;

        await Product.findOne({where:{id}})
            .then( async data => {
                if(data) {
                    let newVal = {};
                    formId ? newVal.formId = formId : false;
                    typeId ? newVal.typeId = typeId : false;
                    name ? newVal.name = name : false;
                    price ? newVal.price = price : false;

                    if(req.files) {
                        const {img} = req.files;
                        const type = img.mimetype.split('/')[1];
                        let fileName = uuid.v4() + `.${type}`;
                        img.mv(path.resolve(__dirname, '..', 'static', fileName));
                        newVal.img = fileName;
                    }

                    if(info) {
                        const parseInfo = JSON.parse(info);
                        for (const item of parseInfo) {
                            await ProductInfo.findOne({where:{id: item.id}}).then( async data => {
                                if(data) {
                                    await ProductInfo.update({
                                        title: item.title,
                                        description: item.description
                                    }, {where:{id: item.id}})
                                } else {
                                    await ProductInfo.create({
                                        title: item.title,
                                        description: item.description,
                                        productId: id
                                    })
                                }
                            })
                        }
                    }

                    await Product.update({
                        ...newVal
                    }, {where:{id}} ).then(() => {
                        return res.json("Товар обновлен");
                    })
                } else {
                    return res.json("Данного товара не существует в базе данных");
                }
            })
        } catch (e) {
        return res.json(e);
    }
}
  
 

  async deleteProduct(req, res) {
    const id = req.params.id;
    Product.destroy({
      where: {
        id: id,
      },
    }).then((res) => {
     
    });
    await OrderProduct.destroy({where:{productId: id}})
    await BasketProduct.destroy({where:{productId: id}})
  }
}

module.exports = new productController();
