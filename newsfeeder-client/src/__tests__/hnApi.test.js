import axios from 'axios';
import { getStory, getStoryIDs, topStoriesURL, storyURL } from '../services/hnAPI'
import { singularStory, storyIDs, emptySingularStory } from '../fixtures';

jest.mock('axios');

describe('HackerNews API', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('getStory functionality', () => {
    it('requests and gets a story from  the HN API', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: { ...singularStory }}))

      const entity = await getStory(1); 

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`)
      expect(entity).toEqual(singularStory)
    })

    it('cant retrieve story, handles gracefully', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: { ...emptySingularStory }}))

      const entity = await getStory(1); 

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(`${storyURL + 1}.json`)
      expect(entity).toEqual(emptySingularStory)
    })
  })

  describe('getStoryIDs functionality', () => {
    it('requests and gets storyIDs from  the HN API', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: [...storyIDs] }))

      const entity = await getStoryIDs(); 

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(topStoriesURL)
      expect(entity).toEqual(storyIDs)
    })
  })
})