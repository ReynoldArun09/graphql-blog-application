import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        return token;
      },
    }),
  );

  app.listen(3000, () => console.log(`Server up and running on http://localhost:3000`));
}

startServer();
