const Prisma = require('@prisma/client');

const prisma = new Prisma.PrismaClient();

async function main() {

    const post = await prisma.post.create({
        data: {
            title: 'My first post',
            mainImage: 'https://sun9-66.userapi.com/impg/aukOqghGkMVnkRqyVRnm3snzqrhTTjRXOIfS3Q/tmzTS0WOhlQ.jpg?size=1969x1969&quality=96&sign=5358b0e603206b364d75d8ab197d05b3&type=album',
            published: true,
        }
    });

    const contentForPost = await prisma.content.create({
        data: {
            type: 'Header',
            content: 'First post',
            index: 1,
            postId: post.id,
        }
    });

    const mainPage = await prisma.page.create({data: {
           title: 'Main page',
           path: '/',
       }
    });

    const contentForPage = await prisma.pageContent.create({
        data: {
            type: 'Header',
            content: 'Main page',
            pageId: mainPage.id,
        }
    
    })

    const mainNavLink = await prisma.mainNavLink.create({
        data: {
            title: 'Main page',
            pageId: mainPage.id,
        }    
    });
   
}

main()