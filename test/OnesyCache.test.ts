/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

import OnesyCache from '../src';

group('OnesyCache', () => {

  preTo(async () => OnesyCache.reset());

  to('add', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.OnesyCache.add(4, ...args);

      return window.OnesyCache.get(...args);
    });

    const args = [4, { a: 4, ab: 4 }];

    OnesyCache.add(4, ...args);

    const valueNode = OnesyCache.get(...args);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(4));
  });

  to('get', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.OnesyCache.add(4, ...args);

      return window.OnesyCache.get(...args);
    });

    const args = [4, { a: 4, ab: 4 }];

    OnesyCache.add(4, ...args);

    const valueNode = OnesyCache.get(...args);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(4));
  });

  to('has', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.OnesyCache.add(4, ...args);

      return window.OnesyCache.has(...args);
    });

    const args = [4, { a: 4, ab: 4 }];

    OnesyCache.add(4, ...args);

    const valueNode = OnesyCache.has(...args);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(true));
  });

  to('update', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.OnesyCache.add(4, ...args);

      // tslint:disable-next-line
      const a = window.OnesyCache.get(...args);

      window.OnesyCache.update(4, 4, ...args);
      window.OnesyCache.update(40, ...args);

      return [a, window.OnesyCache.get(...args), window.OnesyCache.get(4, ...args)];
    });

    const args = [4, { a: 4, ab: 4 }];

    OnesyCache.add(4, ...args);

    const a = OnesyCache.get(...args);

    OnesyCache.update(4, 4, ...args);
    OnesyCache.update(40, ...args);

    const valueNode = [a, OnesyCache.get(...args), OnesyCache.get(4, ...args)];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([4, 40, undefined]));
  });

  to('remove', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const args = [4, { a: 4, ab: 4 }];

      window.OnesyCache.add(4, ...args);

      // tslint:disable-next-line
      const a = window.OnesyCache.get(...args);

      window.OnesyCache.remove(...args);

      return [a, window.OnesyCache.get(...args)];
    });

    const args = [4, { a: 4, ab: 4 }];

    OnesyCache.add(4, ...args);

    const a = OnesyCache.get(...args);

    OnesyCache.remove(...args);

    const valueNode = [a, OnesyCache.get(...args)];

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

          window.OnesyCache.add(object, ...args);

          // tslint:disable-next-line
          const result = [];

          window.OnesyCache.options = { value: { copy: false } };

          // By default value is not copied
          // and value for array and object values is the same
          result.push(object === window.OnesyCache.get(...args));

          // Update value.copy option
          window.OnesyCache.options = { value: { copy: true } };

          window.OnesyCache.add(object, ...args);

          // With value.copy true, value is copied and
          // value for array and object values reference is not the same
          result.push(object !== window.OnesyCache.get(...args));

          return result;
        });

        const args = [4, { a: 4, ab: 4 }];
        const object = {};

        OnesyCache.add(object, ...args);

        const result = [];

        OnesyCache.options = { value: { copy: false } };

        // By default value is not copied
        // and value for array and object values is the same
        result.push(object === OnesyCache.get(...args));

        // Update value copy option
        OnesyCache.options = { value: { copy: true } };

        OnesyCache.add(object, ...args);

        // With value copy true, value is copied and
        // value for array and object values reference is not the same
        result.push(object !== OnesyCache.get(...args));

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

          window.OnesyCache.options = { add: { override: true } };

          window.OnesyCache.add(40, ...args);
          window.OnesyCache.add(4, ...args);

          // tslint:disable-next-line
          const result = [];

          result.push(window.OnesyCache.get(...args));

          // Update add override option
          window.OnesyCache.options = { add: { override: false } };

          window.OnesyCache.add(40, ...args);

          result.push(window.OnesyCache.get(...args));

          return result;
        });

        const args = [4, { a: 4, ab: 4 }];

        OnesyCache.add(40, ...args);
        OnesyCache.add(4, ...args);

        const result = [];

        result.push(OnesyCache.get(...args));

        // Update options
        OnesyCache.options = { add: { override: false } };

        OnesyCache.add(40, ...args);

        result.push(OnesyCache.get(...args));

        const valueNode = result;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([4, 4]));
      });

    });

  });

  to('reset', async () => {
    OnesyCache.reset();

    assert(OnesyCache.caches).eql({});
    assert(OnesyCache.options).eql({
      value: {
        copy: false,
      },
      add: {
        override: true,
      },
    });
  });

});
