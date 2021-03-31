import { gql } from 'apollo-server';  // basically tagging what were using. 

//Schema is just a bunch of type definitions. 

export const typeDefs = gql`
  type Query {
    allArticles: [Article!]!
    allArticlesBySource(source: String!) : [Article!]!
    articleBySource(id: ID!, source: String!): Article 
    articlesBySource(ids: [Int!]!, source: String!): [Article!]!
  }

  type Article {
    id: ID!
    title: String!
    author: String!
    url: String
    time: String
    source: String
  }
`

