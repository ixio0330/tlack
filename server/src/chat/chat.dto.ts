export interface ChatEntity extends CreateChatDto {
  id: string;
  senttime: string;
}

export interface CreateChatDto {
  content: string;
  channel_id: string;
  user_id: string;
}

export interface GetChatDto {
  channel_id: string;
  offset?: number;
  limit?: number;
}