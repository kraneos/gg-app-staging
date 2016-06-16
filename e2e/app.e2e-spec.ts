import { AngularSegguPage } from './app.po';

describe('angular-seggu App', function() {
  let page: AngularSegguPage;

  beforeEach(() => {
    page = new AngularSegguPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
