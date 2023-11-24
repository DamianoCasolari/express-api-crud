const notFound = require("../utilities/notFoundErrors")

module.exports = function (req,res,next){

    next(new notFound(" Pagina non trovata", 404))
}