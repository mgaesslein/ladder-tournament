export type Player = {
  name: string;
  id: number;
  ranking: number;
}

export type Tier = {
  id: number;
  name: string;
  players: Player[];
}
