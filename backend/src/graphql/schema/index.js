import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    profilePic: String
  }

  type CreateUserResponse {
    message: String!
    status: Int!
    data: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, profilePic: String): CreateUserResponse!
    login(email: String!, password: String!): CreateUserResponse!
  }

  type Query {
    getAllUser: [User!]
  }
`;

export default typeDefs;
