export interface ICastVoteDto {
  userId: string;
  sessionId: string;
  pollId: string;
  optionId: string;
}
export interface IVotesDto {
  pollId: string;
  votes: Array<IPollVoteDto>;
}
export interface IPollVoteDto {
  optionId: string;
  votes: number;
}
