import http from ".";
import { Response } from './response.dto';
import { getError } from "../utils/getError";
import store from '../store';
import { showSnackbar } from '../store/app';

export interface ChannelDto {
  id: string;
  name: string;
  description: string | null;
}

export type CreateChannelDto = {
  name: string;
  workspace_id: string;
  description?: string;
  users?: string[]
}

interface GetChannel extends Response {
  channel_list: ChannelDto
}

class ChannelService {
  async getAllChannels(workspace_id: string): Promise<GetChannel | undefined> {
    try {
      return await http.get(`/channel?workspace_id=${workspace_id}`);
    } catch (error) {
      const { message, type } = getError(error);
      store.dispatch(showSnackbar({ message, type }));
    }
  }

  async create(channel: CreateChannelDto): Promise<boolean> {
    let result = {} as Response;
    try {
      const response = await http.post('/channel', { ...channel }) as Response;
      console.log(response);
      result = getError(response);
      return true;
    } catch (error) {
      result = getError(error);
    } finally {
      store.dispatch(showSnackbar({ message: result.message, type: result.type }));
    }
    return false;
  }
}

const channelService = new ChannelService();
export default channelService;