export interface ISessionCreateDto {
  userId: string;
  name: string;
  description: string;
}

export interface ISessionDetailsDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  isOwner: boolean;
}

export interface IPollsListItemDto {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
}
