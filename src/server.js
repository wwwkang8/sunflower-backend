import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils";
//import "./passport"

sendSecretMail("wwwkang8@gmail.com", "123");

console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
server.express.unsubscribe("/api", passport.authenticate("jwt"));

server.start({port : PORT}, () => console.log(`Server running on port http://localhost:${PORT}`));