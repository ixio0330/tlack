export default interface CustomError extends Error {
  status: number;
  name: string;
  message: string;
}