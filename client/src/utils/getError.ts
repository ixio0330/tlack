import { Response } from '../api/response.dto';

/**
 * Error 객체를 받아서 서버의 Response 인터페이스로 형변환
 * @param error 
 * @returns Response
 */
export function getError(error: any) {
  return (error as Response)
}