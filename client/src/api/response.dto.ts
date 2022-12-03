/**
 * 서버 응답 인터페이스
 */
export interface Response {
  type: 'success' | 'info' | 'warn' | 'error';
  name: string;
  message: string;
  [key: string]: any;
}