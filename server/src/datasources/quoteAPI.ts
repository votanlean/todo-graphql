import { RESTDataSource } from 'apollo-datasource-rest';

export class QuoteAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.quotable.io/';
  }

  async getRandomQuote() {
    const quote = await this.get('random');
    return {id: quote._id, ...quote};
  }
}
