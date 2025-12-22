export type Player = {
  id: number;
  name: string;
  ranking: number;
  row: number;
}

export type Tier = {
  id: number;
  name: string;
  players: Player[];
}

export type ChallengeRequest = {
  challenger_id: number;
  opponent_id: number;
  winner_id: number;
}

export type ChallengeValidation = {
  isValid: boolean;
  reason?: string;
}
