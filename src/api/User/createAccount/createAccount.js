import { prisma } from "../../../../generated/prisma-client";

export default {

    /* Mutation 작업유형일 경우에 */ 
    Mutation: {
        // createAccount 함수를 호출한다.
        createAccount: async(_, args) => {
            // args는 userName, email, firstName, lastName, bio 매개변수로 가지고 있다.
            // args의 매개변수 값을 각각의 변수에 할당.
            const { userName, email, firstName= "", lastName = "", bio = "" } = args;

            // prisma client에 내장된 createUser를 사용하여 User를 생성한다.
            // 생성한 User를 화면에 반환.
            const user = await prisma.createUser({
                userName,
                email,
                firstName,
                lastName,
                bio
            });
            return user;

        }
    }

}