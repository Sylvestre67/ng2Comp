import { D3Ng2Page } from './app.po';

describe('d3-ng2 App', function() {
  let page: D3Ng2Page;

  beforeEach(() => {
    page = new D3Ng2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
