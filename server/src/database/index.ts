import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private database: Pool | null = null;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.database = new Pool({
      user: process.env.DATABASE_USERNAME,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_ID,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT as string) || 5432,
    });
    try {
      await this.database.connect();
    } catch (error) {
      console.log(error);
      throw new Error('서버 내부 오류가 발생했습니다.');
    }
  }

  async query(_query: string) {
    return await this.database?.query(_query);
  }
}

const database = new Database();
export default database;