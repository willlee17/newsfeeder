import { HackerNewsAPI } from './hackernews';
import { NewYorkTimesAPI } from './newyorktimes';
import { GoogleNewsAPI } from './googlenews';
import { BuzzFeedNewsAPI } from './buzzfeednews';
import { CNNNewsAPI } from './cnnnews';

export default {
  hackernews: new HackerNewsAPI(), 
  newyorktimes: new NewYorkTimesAPI(),
  googlenews: new GoogleNewsAPI(),
  buzzfeednews: new BuzzFeedNewsAPI(), 
  cnnnews: new CNNNewsAPI()
}