import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default{

    //작업 타입 : Mutation(생성, 수정, 삭제 등의 작업)
    Mutation: {
        //graphql에서 정의한 함수명
        confirmSecret: async(_, args) => {

            //graphql에서 정의한 매개변수(email, secret)
            const{ email, secret } = args;

            // prisma 클라이언트 모듈로 user 정보를 조회한다.(email을 검색조건으로 사용)
            const user = await prisma.user({email});

            //조회한 user의 loginSecret과 입력받은 secret이 같은지 확인
            if(user.loginSecret === secret){
                const token = generateToken(user.id);
                // JWT
                return token;
            }else {
                throw Error("Wrong email/secret combination");
            }
        }
    }


}