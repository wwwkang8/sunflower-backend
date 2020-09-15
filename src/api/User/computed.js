import { prisma } from "../../../generated/prisma-client";

export default {

    User: {

        fullName: async (parent) => {
            return `${parent.firstName} ${parent.lastName}`
        },
        isFollowing: async (parent, _, { request }) => {

            // 현재 인증된 사용자의 user 객체 할당
            const { user } = request;

            // 상위 Resolver의 데이터(seeUser.js에서 조회할 user id로 반환받은 user 데이터)
            const { id: parentId } = parent;

            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            // 현재 나 자신
                            id: user.id
                        },
                        {
                            //내가 following 하고 있는 상대 user
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                });
            }catch(error){
                return false;
            }
        },
        isSelf: async(parent, _, { request }) => {
            
            // 현재 인증된 사용자
            const { user } = request;

            // 상위 Resolver에서 조회한 user.
            const { id: parentId } = parent;

            //user id 일치여부 확인
            return user.id == parentId
        }

    }


}