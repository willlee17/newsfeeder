import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hnAPI';
import { StoryWrapper, StoryTitle, StoryMeta, StoryMetaElement } from '../styles/StoryStyles';
import { mapTime } from '../mappers/mapTime'

export const Story = memo(function Story({ storyID }) {
  const [story, setStory] = useState({})

  useEffect(() => {
    getStory(storyID).then(story => story && story.url && setStory(story))
  }, [])

  return story && story.url ? (
    <StoryWrapper data-testid="story"> 
      <StoryTitle>
        <a href={story.url}>{story.title}</a>
      </StoryTitle>
      <StoryMeta>
        <span  data-testid="story-by">
          <StoryMetaElement color="#000">
            By: 
          </StoryMetaElement>{story.by}
        </span>
        <span  data-testid="story-time">
          <StoryMetaElement color="#000">
            Posted: 
          </StoryMetaElement>{mapTime(story.time)}
        </span>
      </StoryMeta>
    </StoryWrapper>

  ) : null;
})