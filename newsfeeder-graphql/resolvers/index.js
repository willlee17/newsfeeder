export const resolvers = {
  Query: {                                                                                            
    allArticles: (_, __, {dataSources}) => Promise.all(
      Object.keys(dataSources).map(source => dataSources[source].getAllArticles())
    ).then(res => res.reduce((acc, data) => acc.concat(data), [])), 
    allArticlesBySource: (_, {source}, {dataSources}) => dataSources[source].getAllArticles(), 
    articleBySource: (_, {id, source}, {dataSources}) => dataSources[source].getArticle(id, source),    // context is an object that's shared across a bunch of resolvers. great for data loading, authentication, cookie tracking 
    articlesBySource: (_, {ids, source} , {dataSources}) => dataSources[source].getArticlesByIDs(ids), 
  }
}