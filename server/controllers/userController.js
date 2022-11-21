const ApiError = require("../error/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY || "total", {
    expiresIn: "12h",
  });
};
class userController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.errorRequest("Uncorrect data"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.errorRequest("An account with this data is already exist")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(
        ApiError.internal("An account with this login does not exist")
      );
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
 
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }

  async checkAuth(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token });
  }
  
  async getOne(req, res, next) {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    return res.json(user);
  }
  async getAll(req, res, next) {
    User.findAll({ raw: true })
      .then((users) => {
        res.send(users);
    
      })
      .catch((err) => console.log(err));
  }

  async deleteUser(req, res, next) {
    const id = req.params.id;
    console.log(id);
    User.destroy({
      where: {
        id: id,
      },
    })
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  async changeUser(req, res, next) {
    const id = req.params.id;
    const { role } = req.body;
    
    if(role==="USER")
   { User.update(
      {
        role: "MODER",
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then((res) => {})}
     else if(role==="MODER")
      { User.update(
         {
           role: "USER",
         },
         {
           where: {
             id: id,
           },
         }
       )
         .then((res) => {})}


  }
}

module.exports = new userController();
