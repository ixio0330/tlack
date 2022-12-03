import database from "../database";
import BadRequest from "../error/badRequest";
import { InviteWorkspaceDto, WorkspaceEntity } from "./workspace.dto";

class WorkspaceStorage {
  async getInviteInfo(workspace_id: string, user_id: string) {
    let result;
    try {
      result = await database.query(`select * from invites_workspace where workspace_id='${workspace_id}' and user_id='${user_id}'`);
    } catch (error) {
      throw new Error('워크스페이스 초대 정보 조회 중 오류가 발생했습니다.');
    }

    if (!result?.rows[0]) {
      throw new BadRequest('워크스페이스가 존재하지 않거나, 초대되지 않은 사용자입니다.');
    }
    return result.rows[0];
  }
  
  async getById(workspace_id: string) {
    let result;
    try {
      result = await database.query(`select * from workspaces where id='${workspace_id}'`);
    } catch (error) {
      throw new Error('워크스페이스 조회 중 오류가 발생했습니다.');
    }
    if (!result?.rows.length) {
      throw new BadRequest('존재하지 않는 워크스페이스입니다.');
    }
    return result.rows[0];
  }

  async getWorkspaceListLength(owner: string): Promise<number> {
    try {
      const result = await database.query(`select count(owner) from workspaces where owner='${owner}'`);
      return parseInt(result?.rows[0].count);
    } catch (error) {
      throw new Error('워크스페이스 개수 조회 중 오류가 발생했습니다.');
    }
  }

  async create({ id, name, owner, description, max_channels, max_participants }: WorkspaceEntity) {
    try {
      return await database.query(`
        insert into workspaces (id, name, description, owner, max_channels, max_participants) 
        values ('${id}', '${name}', ${description ? `'${description}'` : null}, '${owner}', ${max_channels}, ${max_participants})
      `);
    } catch (error) {
      throw new Error('워크스페이스 생성 중 오류가 발생했습니다.');
    }
  }

  async invite({ users, workspace_id }: InviteWorkspaceDto, init?: boolean) { // 초기 초대인지 init으로 판별
    try {
      let query = 'insert into invites_workspace (user_id, workspace_id, isjoin) values ';
      users.forEach((user, index) => {
        if (users.length - 1 === index) {
          // 초대자는 배열 맨 마지막에 추가했으므로, 맨 마지막 사람은 이미 초대된 상태
          query += ` ('${user}', '${workspace_id}', ${init ? true : false})`;
          return;
        }
        query += `('${user}', '${workspace_id}', false),`;
      });
      return await database.query(query);
    } catch (error) {
      throw new Error('워크스페이스에 사용자 초대 중 오류가 발생했습니다.');
    }
  }

  async getAllByUserId(user_id: string) {
    try {
      const result = await database.query(`
        select w.id, w.name
        from workspaces w 
          inner join invites_workspace iw 
          on w.id=iw.workspace_id 
        where iw.user_id='${user_id}'
      `);
      return result?.rows;
    } catch (error) {

    }
  }
}

const workspaceStorage = new WorkspaceStorage();
export default workspaceStorage;