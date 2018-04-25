import { Player } from "../models/Player";
const nhlApi = require('statsapi-nhl');

export class PlayerService {

    // public async getTeams(): Promise<Player[]> {
    //     let teams: Team[] = [];
    //     teams = await nhlApi.Teams.get();
    //     return teams;
    // }

    public async getPlayer(id: number): Promise<Player> {
        let player: Player;
        player = await nhlApi.Players.get(id);
        return player;
    }

    public async getStats(id: number, season?: string): Promise<Player> {
        return null;
    }
    
}