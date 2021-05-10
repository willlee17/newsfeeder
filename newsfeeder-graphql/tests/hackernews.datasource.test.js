import { HackerNewsAPI } from '../datasources/hackernews';
import {
  emptyReducerReturnValue,
  getAllArticleIdsStub,
  getArticlePostReducerStub,
  getArticlePreReducerStub
} from '../fixtures/hackernews'

const ds = new HackerNewsAPI(); 

ds.get = jest.fn();

describe("[HackerNewsAPI.articleReducer]", () => {
  test("transforms using the article reducer", () => {
    expect(ds.articleReducer(getArticlePreReducerStub)).toEqual(getArticlePostReducerStub)
  })

  test("it does not transform using the article reducer", () => {
    expect(ds.articleReducer()).toEqual(emptyReducerReturnValue)
  })
})

describe("[HackerNewsAPI.getArticle]", () => {
  test("gets a single article from the Hacker News API", async () => {
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const res = await ds.getArticle(21168364);

    expect(res).toEqual(getArticlePostReducerStub);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith('item/21168364.json')
  })
})

describe("[HackerNewsAPI.getArticlesByIDs]", () => {
  test("returns a list of articles from the HackerNews API", async () => {
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const res = await ds.getArticlesByIDs([21168364]);

    expect(res).toEqual([getArticlePostReducerStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith('item/21168364.json')
  })
})

describe("[HackerNewsAPI.getAllArticleIDs", () => {
  test("returns a list of articleIDs from the HackerNews API", async () => {
    ds.get.mockReturnValueOnce([getAllArticleIdsStub]);
    const res = await ds.getAllArticleIDs([21168364]);

    expect(res).toEqual([getAllArticleIdsStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith('topstories.json')
  })
})

describe("[HackerNewsAPI.getAllArticles", () => {
  test("gets an array of all articles from Hacker News API", async () => {
    ds.getAllArticleIDs = jest.fn(); 
    ds.getAllArticleIDs.mockReturnValueOnce(getAllArticleIdsStub); 
    ds.get.mockReturnValueOnce(getArticlePreReducerStub); 

    const res = await ds.getAllArticles();

    expect(res).toEqual([getArticlePostReducerStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith('item/21168364.json')

  })
})