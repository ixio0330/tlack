import database from "../database";
import { InviteWorkspaceDto, WorkspaceEntity } from "./workspace.dto";

class WorkspaceStorage {
  async getWorkspaceListLength(owner: string): Promise<number> {
    try {
      const count = await database.query(`select count(owner) from workspaces where owner='${owner}'`);
      return parseInt(count?.rows[0].count);
    } catch (error) {
      throw new Error('워크스페이스 조회 중 오류가 발생했습니다.');
    }
  }

  async create({ id, name, owner, description, max_channels, max_participants }: WorkspaceEntity) {
    try {
      return await database.query(`
        insert into workspaces (id, name, description, owner, max_channels, max_participants) values
        ('${id}', '${name}', ${description ? `'${description}'` : null}, '${owner}', ${max_channels}, ${max_participants})
      `);
    } catch (error) {
      throw new Error('워크스페이스 생성 중 오류가 발생했습니다.');
    }
  }

  async invite({ users, workspace_id }: InviteWorkspaceDto) {
    try {
      let query = 'insert into invites_workspace (user_id, workspace_id, isjoin) values ';
      users.forEach((user, index) => {
        if (users.length - 1 === index) {
          query += ` ('${user}', '${workspace_id}', false)`;
          return;
        }
        query += `('${user}', '${workspace_id}', false),`;
      });
      return await database.query(query);
    } catch (error) {
      throw new Error('사용자 초대 중 오류가 발생했습니다.');
    }
  }
}

const workspaceStorage = new WorkspaceStorage();
export default workspaceStorage;