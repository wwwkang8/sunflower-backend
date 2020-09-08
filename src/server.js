import "./env.js"
// graphql-yoga는 Graphql 서버를 쉽게 실행시켜 주는 도구
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";


console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

// GraphQL 서버 객체 생성
const server = new GraphQLServer({ 
    schema , 
    context:  ({request}) => ({request, isAuthenticated})
 });

server.express.use(logger("dev"));

/* 서버 실행시 authenticateJwt 함수 호출 */
server.express.use(authenticateJwt);

server.start({port : PORT}, () => console.log(`Server running on port http://localhost:${PORT}`));