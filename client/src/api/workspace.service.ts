import http from ".";
import { Response } from './response.dto';

export type WorkspaceList = {
  id: string;
  name: string;
}[];

export type CreateWorkspaceDto = {
  name: string;
  description?: string;
  users?: string[]
}

interface GetWorkspace extends Response {
  workspace_list: WorkspaceList
}

class WorkspaceService {
  async getAllWorkspace(): Promise<GetWorkspace> {
    return await http.get('/workspace');
  }

  async create(workspace: CreateWorkspaceDto) {
    return await http.post('/workspace', { ...workspace });
  }
}

const workspaceService = new WorkspaceService();
export default workspaceService;