const {Type} = require("../models/models")
const ApiError = require("../error/error")

class typeController {

    async create(req, res){
        try {      
            
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({type})
                
          } catch(e){
              console.log(e.response.data.message)
          } 
        
    }

    async getAll(req, res){
        try {      
            const types = await Type.findAll( { include: { all: true, nested: true } })
            return res.json(types)
      
                
        } catch(e){
            console.log(e)
        } 
       
    }

    async deleteType (req, res){
        try {      
            const id  = req.params.id
            Type.destroy({
                where: {
                    id: id
                }
            }).then((res) => {
               
            });
                
        } catch(e){
            console.log(e.response.data.message)
        } 
 
}

}


module.exports = new typeController()