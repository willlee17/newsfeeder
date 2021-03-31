import axios from 'axios';
import { selectFields } from '../selectors/selectFields'

export const baseURL = 'https://hacker-news.firebaseio.com/v0/'; 
export const topStoriesURL = `${baseURL}topstories.json`;
export const storyURL = `${baseURL}item/`

export const getStoryIDs = async () => {
  const res = await axios.get(topStoriesURL).then(res => res.data)

  return res;
}

export const getStory = async (storyID) => {
  const res = await axios.get(`${storyURL + storyID}.json`).then(({data}) => data &&  selectFields(data))

  return res; 
}