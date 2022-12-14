export interface WorkspaceEntity {
  id: string;
  name: string;
  owner: string;
  description?: string;
  max_channels: number;
  max_participants: number;
}

export interface CreateWorkspaceDto {
  name: string;
  user_id: string;
  description?: string;
  users?: string[];
}

export interface InviteWorkspaceDto {
  users: string[];
  workspace_id: string;
}