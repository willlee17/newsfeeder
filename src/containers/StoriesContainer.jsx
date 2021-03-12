import React, { useState, useEffect, memo } from 'react';
import { getStoryIDs, getStory } from '../services/hnAPI';
import { Story } from '../components/Story';
import { GlobalStyle, StoriesContainerWrapper } from '../styles/StoriesContainerStyles';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export const StoriesContainer = () => {
  const [storyIDs, setStoryIDs] = useState([]);
  const { count } = useInfiniteScroll();

  useEffect(() => {
    getStoryIDs().then(res =>  setStoryIDs(res))
  }, [])

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-testid="stories-container">
        <h1>Hacker News Stories</h1>
        { storyIDs && storyIDs.slice(0, count).map(storyID => <Story key={storyID} storyID={storyID} />) }
      </StoriesContainerWrapper>
    </>
  )
}