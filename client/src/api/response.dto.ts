export interface Response {
  type: 'success' | 'info' | 'warn' | 'error';
  name: string;
  message: string;
  [key: string]: any;
}