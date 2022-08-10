import path from "path";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import axios from "axios";

const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/*.resolver.ts")
);

const schema = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = mergeResolvers(resolversArray);

const api = axios.create({
  baseURL: "https://api.zippopotam.us",
  timeout: 5000,
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    api,
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
