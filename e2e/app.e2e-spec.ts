import { UfoidFrontendPage } from './app.po';

describe('ufoid-frontend App', () => {
  let page: UfoidFrontendPage;

  beforeEach(() => {
    page = new UfoidFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
