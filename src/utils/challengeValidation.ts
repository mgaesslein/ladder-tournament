import { Player, ChallengeValidation } from '../types';

/**
 * Calculate the row number in the pyramid based on ranking
 * Formula: row = ceil((-1 + sqrt(1 + 8 * rank)) / 2)
 */
export function calculateRow(ranking: number): number {
  return Math.ceil((-1 + Math.sqrt(1 + 8 * ranking)) / 2);
}

/**
 * Validate if a challenger can challenge an opponent based on pyramid rules
 * Rules:
 * 1. Challenger must have a higher ranking (worse position) than opponent
 * 2. Opponent must be within the challenger's challenge range
 *    (opponent_ranking >= challenger_ranking - challenger_row + 1)
 */
export function validateChallenge(
  challenger: Player,
  opponent: Player
): ChallengeValidation {
  // Rule 1: Challenger must be behind opponent (higher ranking = worse)
  if (challenger.ranking <= opponent.ranking) {
    return {
      isValid: false,
      reason: 'You can only challenge players ranked above you',
    };
  }

  // Rule 2: Opponent must be within challenge range
  const challengerMaxOpponent = challenger.ranking - challenger.row + 1;
  if (opponent.ranking < challengerMaxOpponent) {
    return {
      isValid: false,
      reason: 'This player is too far ahead to challenge',
    };
  }

  return { isValid: true };
}

/**
 * Get all players that a given challenger can challenge
 */
export function getChallengeablePlayers(
  challenger: Player,
  allPlayers: Player[]
): Player[] {
  return allPlayers.filter((player) => {
    const validation = validateChallenge(challenger, player);
    return validation.isValid;
  });
}

