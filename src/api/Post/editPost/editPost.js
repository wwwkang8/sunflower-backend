import { prisma } from "../../../../generated/prisma-client";

// 삭제, 수정을 상수값으로 선언
const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editPost: async (parent, args, { request, isAuthenticated }, info) => {

            isAuthenticated(request);

            //4개의 아규먼트를 받았다.
            const { id, caption, location, action } = args;
            const user = request;

            // 본인이 작성한 post만 수정해야 하므로 $exists로 본인이 작성한 post가 맞는지 조회
            const post = await prisma.$exists.post({ id, user: { id: user.id } });

            // post가 존재한다면
            if(post){

                // action 옵션이 EDIT면 수정
                if(action === EDIT){
                    return await prisma.updatePost({
                        where: { id },
                        data: {
                            caption,
                            location
                        }
                    });
                }else if(action === DELETE){ //action 옵션이 DELETE면 삭제
                    return await prisma.deletePost({id});
                }

            }else{ //post가 존재하지 않으면 오류
                throw Error("Post doesnt exist. Try again");
            }

        }
    }
}