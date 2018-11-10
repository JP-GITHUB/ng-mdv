import { CatalogueModule } from './catalogue.module';

describe('CatalogueModule', () => {
  let catalogueModule: CatalogueModule;

  beforeEach(() => {
    catalogueModule = new CatalogueModule();
  });

  it('should create an instance', () => {
    expect(catalogueModule).toBeTruthy();
  });
});
