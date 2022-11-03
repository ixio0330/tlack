export interface ChannelEntity {
  id: string;
  name: string;
  description?: string;
  workspace_id: string;
}

export interface CreateChannelDto {
  name: string;
  workspace_id: string;
  description?: string;
  users?: string[];
}

export interface InviteChannelDto {
  users: string[];
  channel_id: string;
}