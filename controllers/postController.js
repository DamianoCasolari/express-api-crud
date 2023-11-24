const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const {kebabCase} = require("lodash");
const notFound = require("../utilities/notFoundErrors");



async function index(req, res,next) {

const filters = req.query.filters
const queryFIlter = {}

if(filters && filters.title){
    queryFIlter.title = {
        contains : filters.title
    }
}
if(filters && filters.slug){
    queryFIlter.slug = {
        contains : filters.slug
    }
}

    try {
        const data = await prisma.post.findMany({
            where : queryFIlter
        });
        if (data.length == 0) {
            next(new Error("Nessun Risultao")) 
        }
        
        return res.json(data);
    } catch (error) {
        console.error("Errore durante l'elaborazione della richiesta:", error);
        next(new Error("Errore interno del server"))
    }
}


async function show(req, res, next) {
    let slug = req.params.slug
    try {
        const data = await prisma.post.findFirst({
            where: {
                slug: slug
            }
        })

        if (!data) {
            next(new notFound("Il post inserito non risulta registrato")) 
        }

        return res.json(data)
    } catch (error) {
        console.error("Errore durante l'elaborazione della richiesta:", error);
        next(new Error("Errore interno del server :" + error.message)) 
    }
}


async function create(req, res,next) {

    const reqBody = req.body
    reqBody.slug = kebabCase(reqBody.title)
    const imagePath = reqBody.image ?? "defaultPlaceHolder.jpg"

    if(!reqBody.title || !reqBody.slug){
        next(new Error("Title and content are required"))
    }

    try {
        const data = await prisma.post.create({
            data: {
                title: reqBody.title,
                slug:  reqBody.slug,
                image: imagePath,
                content: reqBody.content,
                published: reqBody.published,
            }
        })
        
        return res.json(data);
    } catch (error) {
        console.error("Errore durante l'elaborazione della richiesta:", error);
        next(new Error("Errore interno del server"))
    }
}

async function destroy(req, res) {
    let slug = req.params.slug
    try {
        await prisma.post.delete({
            where: {
                slug: slug
            }
        })
        return res.json("File eliminato con successo")
    } catch (error) {
        console.error("Errore durante l'elaborazione della richiesta:", error);
        // throw new Error("Errore interno del server")  
        return res.status(500).json({ error: "Il post inserito non risulta registarto nei nostri server" });
    }
}

module.exports = {
    index,
    create,
    show,
    destroy
}


