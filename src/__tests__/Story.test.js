import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitFor } from '@testing-library/react';
import { Story } from '../components/Story';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnAPI';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();    // cleans up allthe mocks. this makes all the tests reset. So getStory.mockImplementation(....)  will reset 
});

jest.mock('../services/hnAPI', () => ({
  getStory: jest.fn(),
}))

test('renders the Story component with content', async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory)) // coming from fixture so we don't have to hit the API while we're testing

  const { getByText, queryByTestId } = render(<Story storyID={1}/>);

  await waitFor(() => ([
    expect(getByText('Eating pasta every day social experiment')).toBeTruthy(), 
    expect(queryByTestId('story-by').textContent).toEqual(
      'By: William Lee'
    ), 
  ]))

}) 