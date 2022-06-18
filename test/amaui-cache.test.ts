/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import AmauiCache from '../src';

group('@amaui/cache', () => {

  preTo(async () => AmauiCache.reset());

  to('add', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.AmauiCache.add(4, ...args);

      return window.AmauiCache.get(...args);
    });

    const args = [4, { a: 4, ab: 4 }];

    AmauiCache.add(4, ...args);

    const valueNode = AmauiCache.get(...args);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(4));
  });

  to('get', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.AmauiCache.add(4, ...args);

      return window.AmauiCache.get(...args);
    });

    const args = [4, { a: 4, ab: 4 }];

    AmauiCache.add(4, ...args);

    const valueNode = AmauiCache.get(...args);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(4));
  });

  to('has', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.AmauiCache.add(4, ...args);

      return window.AmauiCache.has(...args);
    });

    const args = [4, { a: 4, ab: 4 }];

    AmauiCache.add(4, ...args);

    const valueNode = AmauiCache.has(...args);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(true));
  });

  to('update', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.AmauiCache.add(4, ...args);

      // tslint:disable-next-line
      const a = window.AmauiCache.get(...args);

      window.AmauiCache.update(4, 4, ...args);
      window.AmauiCache.update(40, ...args);

      return [a, window.AmauiCache.get(...args), window.AmauiCache.get(4, ...args)];
    });

    const args = [4, { a: 4, ab: 4 }];

    AmauiCache.add(4, ...args);

    const a = AmauiCache.get(...args);

    AmauiCache.update(4, 4, ...args);
    AmauiCache.update(40, ...args);

    const valueNode = [a, AmauiCache.get(...args), AmauiCache.get(4, ...args)];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([4, 40, undefined]));
  });

  to('remove', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.AmauiCache.add(4, ...args);

      // tslint:disable-next-line
      const a = window.AmauiCache.get(...args);

      window.AmauiCache.remove(...args);

      return [a, window.AmauiCache.get(...args)];
    });

    const args = [4, { a: 4, ab: 4 }];

    AmauiCache.add(4, ...args);

    const a = AmauiCache.get(...args);

    AmauiCache.remove(...args);

    const valueNode = [a, AmauiCache.get(...args)];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([4, undefined]));
  });

  group('options', () => {

    group('value', () => {

      to('copy', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          // tslint:disable-next-line
          const args = [4, { a: 4, ab: 4 }];
          // tslint:disable-next-line
          const object = {};

          window.AmauiCache.add(object, ...args);

          // tslint:disable-next-line
          const result = [];

          window.AmauiCache.options = { value: { copy: false } };

          // By default value is not copied
          // and value for array and object values is the same
          result.push(object === window.AmauiCache.get(...args));

          // Update value.copy option
          window.AmauiCache.options = { value: { copy: true } };

          window.AmauiCache.add(object, ...args);

          // With value.copy true, value is copied and
          // value for array and object values reference is not the same
          result.push(object !== window.AmauiCache.get(...args));

          return result;
        });

        const args = [4, { a: 4, ab: 4 }];
        const object = {};

        AmauiCache.add(object, ...args);

        const result = [];

        AmauiCache.options = { value: { copy: false } };

        // By default value is not copied
        // and value for array and object values is the same
        result.push(object === AmauiCache.get(...args));

        // Update value copy option
        AmauiCache.options = { value: { copy: true } };

        AmauiCache.add(object, ...args);

        // With value copy true, value is copied and
        // value for array and object values reference is not the same
        result.push(object !== AmauiCache.get(...args));

        const valueNode = result;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([true, true]));
      });

    });

    group('add', () => {

      to('override', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          // tslint:disable-next-line
          const args = [4, { a: 4, ab: 4 }];

          window.AmauiCache.options = { add: { override: true } };

          window.AmauiCache.add(40, ...args);
          window.AmauiCache.add(4, ...args);

          // tslint:disable-next-line
          const result = [];

          result.push(window.AmauiCache.get(...args));

          // Update add override option
          window.AmauiCache.options = { add: { override: false } };

          window.AmauiCache.add(40, ...args);

          result.push(window.AmauiCache.get(...args));

          return result;
        });

        const args = [4, { a: 4, ab: 4 }];

        AmauiCache.add(40, ...args);
        AmauiCache.add(4, ...args);

        const result = [];

        result.push(AmauiCache.get(...args));

        // Update options
        AmauiCache.options = { add: { override: false } };

        AmauiCache.add(40, ...args);

        result.push(AmauiCache.get(...args));

        const valueNode = result;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([4, 4]));
      });

    });

  });

  to('reset', async () => {
    AmauiCache.reset();

    assert(AmauiCache.caches).eql({});
    assert(AmauiCache.options).eql({
      value: {
        copy: false,
      },
      add: {
        override: true,
      },
    });
  });

});
