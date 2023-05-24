import merge from '@amaui/utils/merge';
import copy from '@amaui/utils/copy';
import hash from '@amaui/utils/hash';

const unix = () => Math.floor(new Date().getTime() / 1000);

export interface ICacheItem {
  value: any;
  added_at?: number;
  updated_at?: number;
}

interface IOptionsValue {
  copy?: boolean;
}

interface IOptionsAdd {
  override?: boolean;
}

export interface IOptions {
  value?: IOptionsValue;
  add?: IOptionsAdd;
}

const optionsDefault: IOptions = {
  value: {
    copy: false
  },
  add: {
    override: true
  },
};

class AmauiCache {
  public static caches: Record<string, ICacheItem> = {};
  private static options_: IOptions = optionsDefault;

  public static get options() {
    return this.options_;
  }

  public static set options(value: IOptions) {
    this.options_ = merge(value, optionsDefault);
  }

  public static add(value: any, ...args: any[]): void {
    const key = hash(args) as string;

    if (
      !this.caches[key] ||
      this.options.add.override
    ) {
      const value_ = this.options.value.copy ? copy(value) : value;

      this.caches[key] = {
        value: value_,
        added_at: unix(),
      };

      return value_;
    }
  }

  public static update(value: any, ...args: any[]): any | undefined {
    const key = hash(args) as string;

    if (this.caches[key]) {
      const value_ = this.options.value.copy ? copy(value) : value;

      this.caches[key].value = value_;
      this.caches[key].updated_at = unix();

      return value_;
    }
  }

  public static get(...args: any[]): undefined | any {
    const key = hash(args) as string;

    if (this.caches[key]) return this.options.value.copy ? copy(this.caches[key].value) : this.caches[key].value;
  }

  public static has(...args: any[]): boolean {
    const key = hash(args) as string;

    return this.caches.hasOwnProperty(key);
  }

  public static remove(...args: any[]): void {
    const key = hash(args) as string;

    if (this.caches.hasOwnProperty(key)) delete this.caches[key];
  }

  public static reset(): void {
    this.caches = {};

    this.options = optionsDefault;
  }
}

export default AmauiCache;
