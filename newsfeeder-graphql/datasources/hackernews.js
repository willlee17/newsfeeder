import { RESTDataSource } from 'apollo-datasource-rest';

export class HackerNewsAPI extends RESTDataSource {     //allows us to cache the datasource and use it throughout our app. parital query caching  
  constructor() {
    super();
    this.baseURL = 'https://hacker-news.firebaseio.com/v0/';
  }

  articleReducer({id, by, url, time, title} = {}) {
    return {
      id: `hn-${id}`,
      title,
      author: by,
      url,
      time,
      source: 'HackerNews'
    }
  }

  async getAllArticleIDs() {
    const result = await this.get('topstories.json'); 
    return result; 
  }

  async getArticle(articleID) {
    const result = await this.get(`item/${articleID}.json`); 
    return this.articleReducer(result); 
  }

  getArticlesByIDs(articleIDs) {
    return Promise.all(articleIDs.map(articleID => this.getArticle(articleID)))
  }

  async getAllArticles() {
    let articleIDs = await this.getAllArticleIDs();
    articleIDs = articleIDs.slice(0, 100);
    return Promise.all(articleIDs.map(articleID => this.getArticle(articleID)))
  }
}