import * as HTTP_STATUS from 'http-status-codes';
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Tags } from 'tsoa';
import {TeamService} from '../services/TeamService';
import {Team, Roster, Stats, StatRankings} from '../models/Team';

@Route('teams')
export class TeamsController extends Controller {

    @Tags('Teams')
    @Get()
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeams(): Promise<Team[]> {
        return await new TeamService().getTeams();
    }

    @Tags('Teams')
    @Get('{teamId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeam(teamId: number): Promise<Team> {
        return await new TeamService().getTeam(teamId);
    }

    @Tags('Teams')
    @Get('{teamId}/roster')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getRoster(teamId: number, @Query() season?: string): Promise<Roster> {
        return await new TeamService().getRoster(teamId, season);
    }
    
    @Tags('Teams')
    @Get('{teamId}/stats')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getStats(teamId: number, @Query() season?: string): Promise<Stats> {
        return await new TeamService().getStats(teamId, season);
    }
    
    @Tags('Teams')
    @Get('{teamId}/statrankings')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getStatRankings(teamId: number, @Query() season?: string): Promise<StatRankings> {
        return await new TeamService().getStatRankings(teamId, season);
    }
}