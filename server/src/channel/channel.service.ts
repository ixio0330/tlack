import { CreateChannelDto, InviteChannelDto } from "./channel.dto";
import workspaceService from "../workspace/workspace.service";
import channelStorage from "./channel.storage";
import BadRequest from "../error/badRequest";
import { generateShortUuid } from 'custom-uuid';

class ChannelService {
  async create({ name, workspace_id, description, users }: CreateChannelDto) {
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

    // * 인원 초대
    if (users) {
      if (0 < users.length) {
        await channelStorage.invite({
          channel_id,
          users,
        });
      }
    }

    return channel_id;
  }

  async invite(invite: InviteChannelDto) {
    return await channelStorage.invite(invite);
  }
}

const channelService = new ChannelService();
export default channelService;