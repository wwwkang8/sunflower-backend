// utils.js 파일에서 generateSecret 함수를 import 한다
import { generateSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {

    /* 작업유형이 Mutation(생성, 업데이트, 삭제) */
    Mutation: {
        // requestSecret : requestSecret.graphql에서 정의한 함수명
        requestSecret: async(_, args) => {

            // 매개변수값 email을 받는다
            const { email } = args;

            // utils.js의 generateSecret 함수 호출. 랜덤 단어 결과 반환
            const loginSecret = generateSecret();


            try{
                // 입력한 이메일에 대해서 User의 loginSecret 값을 업데이트 친다
                await prisma.updateUser({data: {loginSecret}, where: {email}});
                console.log(loginSecret);
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
        
        }
    }

}