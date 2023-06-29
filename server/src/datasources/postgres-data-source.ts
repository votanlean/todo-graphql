import {DataSource} from 'apollo-datasource'
import pg from "pg";
const {Pool} = pg;
import 'dotenv/config'

export class PostgresDataSource extends DataSource {
  private pool;
  constructor() {
    super();
    this.pool = new Pool({
      user: process.env.POSTGRES_USER || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: process.env.POSTGRES_DATABASE || 'todo',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      port: process.env.POSTGRES_PORT || 5432,
    });
  }

  async getTasks() {
    const result = await this.pool.query('SELECT * FROM tasks ORDER BY id DESC');
    return result.rows;
  }

  async toggleTaskStatus(id: number) {
    const result = await this.pool.query('UPDATE tasks SET done = NOT done WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  async addTask(name: string) {
    const result = await this.pool.query('INSERT INTO tasks (name, done) VALUES ($1, false) RETURNING *', [name]);
    return result.rows[0];
  }

  async deleteTask(id: number) {
    const result = await this.pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
