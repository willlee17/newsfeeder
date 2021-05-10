import { RESTDataSource } from 'apollo-datasource-rest';

export class CNNNewsAPI extends RESTDataSource { 
  articleReducer({source, author, url, publishedAt, title} = {}) {
    return {
      id: `cnn-${source.id}`,
      title,
      author: author,
      url,
      time: publishedAt,
      source: 'CNN News'
    }
  }


  async getAllArticles() {
    const result = await this.get(
      'https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=afaf81d369e244529050320b32795d1f'
    )
    if (!!result && !!result.articles.length) {
      return result.articles.map(article => this.articleReducer(article))
    }
    
    return; 
  }
} 