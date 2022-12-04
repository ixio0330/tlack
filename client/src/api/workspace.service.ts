import http from ".";
import { Response } from './response.dto';
import { getError } from "../utils/getError";
import store from '../store';
import { showSnackbar } from '../store/app';

export type WorkspaceDto = {
  id: string;
  name: string;
}[];

export type CreateWorkspaceDto = {
  name: string;
  description?: string;
  users?: string[]
}

interface GetWorkspace extends Response {
  workspace_list: WorkspaceDto
}

class WorkspaceService {
  async getAllWorkspace(): Promise<GetWorkspace | undefined> {
    try {
      return await http.get('/workspace');
    } catch (error) {
      const { message, type } = getError(error);
      store.dispatch(showSnackbar({ message, type }));
    }
  }

  async create(workspace: CreateWorkspaceDto): Promise<boolean> {
    let result = {} as Response;
    try {
      const response = await http.post('/workspace', { ...workspace }) as Response;
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

const workspaceService = new WorkspaceService();
export default workspaceService;