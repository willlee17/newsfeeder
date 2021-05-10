import { RESTDataSource } from 'apollo-datasource-rest';

export class GoogleNewsAPI extends RESTDataSource { 
  // constructor() {
  //   super();
  //   this.baseURL = 'https://hacker-news.firebaseio.com/v0/';
  // }
  articleReducer({source, author, url, publishedAt, title} = {}) {
    return {
      id: `googlenews-${!!source.id ? source.id : source.name}`,
      title,
      author,
      url,
      time: publishedAt,
      source: 'Google News'
    }
  }


  async getAllArticles() {
    const result = await this.get(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=afaf81d369e244529050320b32795d1f'
    )
   
    if (!!result && !!result.articles.length) {
      return result.articles.map(article =>  this.articleReducer(article))
    }
    
    return; 
  }
} 