export interface IPollOptionDto {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
}
export interface IPollDto {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
  options?: Array<IPollOptionDto>;
}
export interface ICreatePollDto {
  sessionId: string;
  name: string;
  description?: string;
  displayOrder: number;
  options?: Array<IPollOptionDto>;
}
