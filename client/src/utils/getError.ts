import { Response } from '../api/response.dto';

export function getError(error: any) {
  return (error as Response)
}