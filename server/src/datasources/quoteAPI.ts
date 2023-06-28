import { DataSourceConfig } from 'apollo-datasource';
import { RESTDataSource } from 'apollo-datasource-rest';
import { InMemoryLRUCache } from 'apollo-server-caching'
export class QuoteAPI extends RESTDataSource {
  cache;
  constructor() {
    super();
    this.baseURL = 'https://api.quotable.io/';
  }

  initialize(config: DataSourceConfig<any>): void {
    super.initialize(config);
    this.cache = config.cache || new InMemoryLRUCache();
  }

  cacheKey() {
    // This API returns a random quote, so we can just use the same cache key
    // Otherwise we would need to use id for the cache key
    return `quote-quotableio`;
  }

  async getRandomQuote() {
    const cachedQuote = await this.cache.get(this.cacheKey());
    if (cachedQuote) {
      return cachedQuote;
    }
    const quote = await this.get('random');
    const myQuote = {id: quote._id, ...quote};
    await this.cache.set(this.cacheKey(), myQuote, {ttl: 5});// 5 seconds
    return myQuote;
  }
}
