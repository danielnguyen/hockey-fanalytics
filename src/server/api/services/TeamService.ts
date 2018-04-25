import { Team, Roster, Stats, StatRankings } from "../models/Team";
const nhlApi = require('statsapi-nhl');

export class TeamService {

    public async getTeams(): Promise<Team[]> {
        let teams: Team[] = [];
        teams = await nhlApi.Teams.get();
        return teams;
    }

    public async getTeam(id: number): Promise<Team> {
        let team: Team;
        team = await nhlApi.Teams.get(id);
        return team;
    }

    public async getRoster(id: number, season?: string): Promise<Roster> {
        let roster: Roster;
        roster = await nhlApi.Teams.getRoster(id, season);
        return roster;
    }

    public async getStats(id: number, season?: string): Promise<Stats> {
        let stats: Stats;
        stats = await nhlApi.Teams.getStats(id, season);
        return stats;
    }
    
    public async getStatRankings(id: number, season?: string): Promise<StatRankings> {
        let statrankings: StatRankings;
        statrankings = await nhlApi.Teams.getStatRankings(id, season);
        return statrankings;
    }
    
}