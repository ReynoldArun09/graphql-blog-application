import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import initializeMongo from "./database/mongo.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await initializeMongo();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    }),
  );

  app.listen(5000, () => console.log(`Server up and running on http://localhost:3000`));
}

startServer();
