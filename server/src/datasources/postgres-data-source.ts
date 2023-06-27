import {DataSource} from 'apollo-datasource'
import pg from "pg";
const {Pool} = pg;

export class PostgresDataSource extends DataSource {
  private pool;
  constructor() {
    super();
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'todo',
      password: 'postgres',
      port: 5432,
    });
  }

  async getTasks() {
    const result = await this.pool.query('SELECT * FROM tasks');
    return result.rows;
  }

  async toggleTaskStatus(id: number) {
    const result = await this.pool.query('UPDATE tasks SET done = NOT done WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
