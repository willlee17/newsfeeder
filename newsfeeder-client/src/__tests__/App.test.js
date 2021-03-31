import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitFor } from '@testing-library/react';
import { App } from '../App'
import { storyIDs, singularStory } from '../fixtures';
import { getStory, getStoryIDs } from '../services/hnAPI';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll')
jest.mock('../services/hnAPI', () => ({
  getStory: jest.fn(),
  getStoryIDs: jest.fn(), 
}))

test('renders the application', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT
  }))

  getStory.mockImplementation(() => Promise.resolve(singularStory)) // coming from fixture so we don't have to hit the API while we're testing
  getStoryIDs.mockImplementation(() => Promise.resolve(storyIDs))

  await act(async () => {
    const { getByText, queryByTestId } = render(<App/>);
    await waitFor(() => [
      expect(getByText('Hacker News Stories')).toBeTruthy(), 
      expect(getByText('Eating pasta every day social experiment')).toBeTruthy(), 
      expect(queryByTestId('story-by').textContent).toEqual(
        'By: William Lee'
      ), 
    ])
  })
})