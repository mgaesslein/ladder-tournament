export type Player = {
  name: string;
}

export type Tier = {
  id: number;
  name: string;
  players: Player[];
}
