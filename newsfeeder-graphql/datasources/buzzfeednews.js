import { RESTDataSource } from 'apollo-datasource-rest';

export class BuzzFeedNewsAPI extends RESTDataSource { 
  articleReducer({id, username, canonical_path, published_date, title} = {}) {
    return {
      id: `buzzfeed-${id}`,
      title,
      author: username,
      url: `https://buzzfeednews.com/article${canonical_path}`,
      time: published_date,
      source: 'BuzzFeed News'
    }
  }


  async getAllArticles() {
    const result = await this.get(
      'http://www.buzzfeed.com/api/v2/feeds/news'
    )
    // console.log('buzzed: ', result)
    if (!!result && !!result.big_stories.length) {
      return result.big_stories.map(article => this.articleReducer(article))
    }
    
    return; 
  }
} 