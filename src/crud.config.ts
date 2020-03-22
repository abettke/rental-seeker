import { CrudConfigService } from '@nestjsx/crud';

/**
 * This must be loaded before the import of the main application module.
 * https://github.com/nestjsx/crud/wiki/Controllers#global-options
 */
CrudConfigService.load({
  query: {
    limit: 20,
    maxLimit: 100,
    alwaysPaginate: true,
  },
});
