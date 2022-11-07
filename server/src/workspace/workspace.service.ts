import BadRequest from '../error/badRequest';
import { CreateWorkspaceDto, InviteWorkspaceDto } from './workspace.dto';
import workspaceStorage from './workspace.storage';
import { generateShortUuid } from 'custom-uuid';

class WorkspaceService {
  private max_workspace = 2;
  private max_channels = 5;
  private max_participants = 10;

  async getInviteInfo(workspace_id: string, user_id: string) {
    return await workspaceStorage.getInviteInfo(workspace_id, user_id);
  }

  async getById(workspace_id: string) {
    return await workspaceStorage.getById(workspace_id);
  }

  async create({ name, user_id, users = [], description }: CreateWorkspaceDto) {
    // owner의 workspace 개수를 체크한다.
    const workspaceListLength = await workspaceStorage.getWorkspaceListLength(user_id);
    if (this.max_workspace <= workspaceListLength) {
      throw new BadRequest(`워크스페이스는 최대 ${this.max_workspace}개까지 생성 가능합니다.`);
    }
    
    const workspace_id = generateShortUuid();

    // workspace를 만든다.
    await workspaceStorage.create({
      id: workspace_id,
      name,
      owner: user_id,
      description,
      max_channels: this.max_channels,
      max_participants: this.max_participants,
    });

    // 초대자도 초대인원으로 추가
    users.push(user_id);

    // 초대인원 수 체크
    if (this.max_participants < users.length) {
      throw new BadRequest(`최대 ${this.max_participants}명까지 초대할 수 있습니다.`);
    }

    await workspaceStorage.invite({
      users,
      workspace_id
    }, true);

    return workspace_id;
  }

  async invite(invite: InviteWorkspaceDto) {
    return await workspaceStorage.invite(invite);
  }

  async getAllByUserId(user_id: string) {
    return await workspaceStorage.getAllByUserId(user_id);
  }
}

const workspaceService = new WorkspaceService();
export default workspaceService;