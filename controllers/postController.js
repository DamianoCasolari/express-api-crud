const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()



async function index(req, res) {
    try {
        const data = await prisma.post.findMany();
        if (data.length == 0) {
            throw new Error("Il dabatabase è vuoto");
        }
        return res.json(data);
    } catch (error) {
        console.error("Errore durante l'elaborazione della richiesta:", error);
        throw new Error("Errore interno del server")  
    }
}


async function show(req,res) {
    let slug = req.params.slug
    try{
        const data = await prisma.post.findFirst({
            where: {
                slug : slug 
            }
        })

        if (!data) {
            // throw new Error("Il post inserito non risulta registrato");
            return res.status(500).json({ error: "Errore interno del server" });

        }

        return res.json(data)
    }catch(error){
        console.error("Errore durante l'elaborazione della richiesta:", error);
        throw new Error("Errore interno del server")  
    }
}


async function destroy(req,res) {
    let slug = req.params.slug
    if(!slug) {
        throw new Error("Il post inserito non risulta registrato")  
      }
      try{
          const data = await prisma.post.delete({
              where: {
                  slug : slug 
              }
          })
          return res.json("File eliminato con successo")
      }catch(error){
        console.error("Errore durante l'elaborazione della richiesta:", error);
        throw new Error("Errore interno del server")  
      }
}

module.exports = {
    index,
    show,
    destroy 
}


