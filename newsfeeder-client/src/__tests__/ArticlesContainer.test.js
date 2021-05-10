import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { ArticlesContainer } from '../containers/ArticlesContainer'
import { allArticles, noArticles } from '../fixtures';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';

import { MockedProvider } from '@apollo/react-testing';
import { GET_ALL_ARTICLES } from '../graphql/get-all-articles';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../hooks/useInfiniteScroll')

test('renders the <ArticlesContainer /> with articles', async () => {
  const allArticleMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES,
      },
      result: {
        data: {
          ...allArticles
        }
      }
    }
  ]


  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT
  }))

  await act(async () => {
    const { getByText, queryByTestId } = render(
    <MockedProvider mocks={allArticleMocks}>
      <ArticlesContainer />
    </MockedProvider>
    );
    await waitForElement(() => [
      expect(getByText('News Stories')).toBeTruthy(), 
      expect(getByText('Eating pasta every day social experiment')).toBeTruthy(), 
      expect(queryByTestId('article-author').textContent).toEqual(
        'Author: William Lee'
      ), 
    ])
  })
})

test('does not render articles when there arent any', async () => {
  const allArticleMocks = [
    {
      request: {
        query: GET_ALL_ARTICLES,
      },
      result: {
        data: {
          ...noArticles
        }
      }
    }
  ]


  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT
  }))

  await act(async () => {
    const { queryByText, queryByTestId } = render(
    <MockedProvider mocks={allArticleMocks}>
      <ArticlesContainer />
    </MockedProvider>
    );
    await waitForElement(() => [
      expect(queryByText('News Stories')).toBeTruthy(), 
      expect(queryByText('Eating pasta every day social experiment')).toBeFalsy(), 
      expect(queryByTestId('article-author')).toBeFalsy(),
    ])
  })
})