import "./env.js"
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils";
import { authenticateJwt } from "./passport";


console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ 
    schema , 
    context:  ({request}) => ({request})
 });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port : PORT}, () => console.log(`Server running on port http://localhost:${PORT}`));