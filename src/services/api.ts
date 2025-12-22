import { Player, ChallengeRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async getPlayers(): Promise<Player[]> {
    const response = await fetch(`${API_BASE_URL}/players`);
    if (!response.ok) {
      throw new Error(`Failed to fetch players: ${response.statusText}`);
    }
    return response.json();
  },

  async getPlayer(playerId: number): Promise<Player> {
    const response = await fetch(`${API_BASE_URL}/players/${playerId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch player: ${response.statusText}`);
    }
    return response.json();
  },

  async createPlayer(playerName: string): Promise<Player> {
    const response = await fetch(`${API_BASE_URL}/players/?player_name=${encodeURIComponent(playerName)}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Failed to create player: ${response.statusText}`);
    }
    return response.json();
  },

  async createChallenge(challenge: ChallengeRequest): Promise<{ message: string }> {
    const params = new URLSearchParams({
      challenger_id: challenge.challenger_id.toString(),
      opponent_id: challenge.opponent_id.toString(),
      winner_id: challenge.winner_id.toString(),
    });
    
    const response = await fetch(`${API_BASE_URL}/challenges/?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Challenge failed: ${response.statusText}`);
    }

    return response.json();
  },
};

