import { prisma } from "../../../generated/prisma-client";

export default {

    Post: {
        isLiked: async (parent, _, { request }) => {

            // 현재 인증된 사용자
            const { user } = request;

            // post id
            const { id } = parent;
    
            // 현재 인증된 사융자가 해당 posts에 대해서 좋아요를 했는가?
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            });

        }
        ,
        likeCount: parent => 
            prisma.likesConnection({
                where: { post: {id: parent.id} }
            })
            .aggregate()
            .count()
        
    }


}