import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT, USER_FRAGMENT } from "../../../fragments";

export default {

    Query: {
        seeRoom: async (parent, args, { request, isAuthenticated }, info) => {

            isAuthenticated(request);
            const { user } = request;
            const { id } = args;

            // Room 중에서 해당 User의 아이디가 참여자로 있는 방이 있다면 존재여부를 canSee로 반환
            const canSee = await prisma.$exists.room({
                participants_some:{
                    id: user.id
                }
            });
            console.log(canSee);

            // User의 아이디가 참여한 방이 있다면 해당 Room을 조회한다.
            if(canSee){
                const room = await prisma.room({id}).$fragment(ROOM_FRAGMENT);
                return room;
            }else{
                throw Error("You can't see this");
            }

        }
    }

}