const { PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient()

const listaPost = [
    {
      id: 1,
      title: "Primo Post",
      slug: "primo-post",
      image: "url_dell_immagine",
      content: "Contenuto del primo post.",
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "Secondo Post",
      slug: "secondo-post",
      image: "url_dell_immagine",
      content: "Contenuto del secondo post.",
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Terzo Post",
      slug: "terzo-post",
      image: "url_dell_immagine",
      content: "Contenuto del terzo post.",
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: "Quarto Post",
      slug: "quarto-post",
      image: "url_dell_immagine",
      content: "Contenuto del quarto post.",
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      title: "Quinto Post",
      slug: "quinto-post",
      image: "url_dell_immagine",
      content: "Contenuto del quinto post.",
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];


  prisma.post.createMany({
    data:listaPost,
    skipDuplicates: true
}).then(result => console.log(result))