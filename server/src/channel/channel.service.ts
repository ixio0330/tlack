import { CreateChannelDto, InviteChannelDto } from "./channel.dto";
import workspaceService from "../workspace/workspace.service";
import channelStorage from "./channel.storage";
import BadRequest from "../error/badRequest";
import { generateShortUuid } from 'custom-uuid';

class ChannelService {
  async create({ name, user_id, workspace_id, description, users = [] }: CreateChannelDto) {
    // * 채널 개수 체크
    const count = await channelStorage.getChannelListLength(workspace_id);
    const workspace = await workspaceService.getById(workspace_id);
    if (workspace.max_channels <= count) {
      throw new BadRequest(`채널은 최대 ${workspace.max_channels}개까지 생성 가능합니다.`);
    }

    const channel_id = generateShortUuid();

    // * 채널 생성
    await channelStorage.create({
      id: channel_id,
      name,
      workspace_id,
      description
    });

    // 초대자도 초대인원으로 추가
    users.push(user_id);

    // * 인원 초대
    await channelStorage.invite({
      channel_id,
      users,
    });

    return channel_id;
  }

  async invite(invite: InviteChannelDto) {
    return await channelStorage.invite(invite);
  }

  async getAllChannles(workspace_id: string) {
    return await channelStorage.getAllChannels(workspace_id);
  }
  
  async getAllInvitedChannles(workspace_id: string, user_id: string) {
    return await channelStorage.getAllInvitedChannels(workspace_id, user_id);
  }
}

const channelService = new ChannelService();
export default channelService;