const {Form} = require("../models/models")
const ApiError = require("../error/error")

class formController {

    async create(req, res){
        const {name, typeFormId} = req.body
        const form = await Form.create({name, typeFormId})
        return res.json({form})
    }

    async getAll(req, res){
        const forms = await Form.findAll({
          
        })
        return res.json(forms)
    }

    async deleteForm (req, res){
            const id  = req.params.id
        Form.destroy({
            where: {
                id: id
            }
        }).then((res) => {
           
        });
    }

}


module.exports = new formController()