import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        upload: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;

            // caption과 files배열(file url 들이 포함)을 아규먼트로 받는다.
            // upload.graphql에서 선언한 그대로 caption, files를 매개변수로 받는다.
            const { caption, files } = args;

            //Post를 생성. connect 옵션을 사용하여 어느 user가 post를 생성하는지 입력
            const post = await prisma.createPost(
            { 
                caption,
                user: { connect: {id: user.id} }
            });

            //files 배열을 for문을 돌려서 File 객체를 생성한다.
            // File 생성시에 위에서 생성한 Post의 id를 가져와서 connect 옵션을 준다.
            files.forEach(
                async file => {
                    await prisma.createFile({
                        url: file,
                        post: {
                            connect: {
                                id: post.id
                            }
                        }

                    })
            });
            return post;

        }
    }
}