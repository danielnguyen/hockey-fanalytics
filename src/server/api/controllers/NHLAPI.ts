import * as HTTP_STATUS from 'http-status-codes';
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Tags } from 'tsoa';
import {NHLAPIService} from '../services/NHLAPIService';
import {
    GameApiOptions, 
    PeopleApiOptions, 
    TeamsApiOptions, 
    ScheduleApiOptions,
    StandingsApiOptions
} from '../models/NHLAPI';

@Route('nhl')
export class NHLAPIController extends Controller {

    @Tags('NHL APIs')
    @Get('teams')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeams(@Query() expand?: string, @Query() season?: string, 
    @Query() stats?: string, @Query() teamIDs?: string): Promise<any> {
        const options: TeamsApiOptions = {
            expand: expand,
            season: season,
            stats: stats,
            teamId: teamIDs
        };
        return await new NHLAPIService().getTeams(options);
    }

    @Tags('NHL APIs')
    @Get('teams/{teamId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeam(teamId: number, @Query() expand?: string, 
    @Query() season?: string, @Query() stats?: string): Promise<any> {
        const options: TeamsApiOptions = {
            expand: expand,
            season: season,
            stats: stats
        }
        return await new NHLAPIService().getTeam(teamId, options);
    }
    
    @Tags('NHL APIs')
    @Get('teams/{teamId}/roster')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeamRoster(teamId: number, @Query() expand?: string, 
    @Query() season?: string, @Query() stats?: string): Promise<any> {
        const options: TeamsApiOptions = {
            expand: expand,
            season: season,
            stats: stats
        }
        return await new NHLAPIService().getTeamRoster(teamId, options);
    }

    @Tags('NHL APIs')
    @Get('teams/{teamId}/stats')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeamStats(teamId: number): Promise<any> {    
        return await new NHLAPIService().getTeamStats(teamId);
    }
    
    @Tags('NHL APIs')
    @Get('divisions')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getDivisions(): Promise<any> {    
        return await new NHLAPIService().getDivisions();
    }

    @Tags('NHL APIs')
    @Get('divisions/{divisionId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getDivision(divisionId: number): Promise<any> {    
        return await new NHLAPIService().getDivision(divisionId);
    }
    
    @Tags('NHL APIs')
    @Get('conferences')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getConferences(): Promise<any> {    
        return await new NHLAPIService().getConferences();
    }

    @Tags('NHL APIs')
    @Get('conferences/{conferenceId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getConference(conferenceId: number): Promise<any> {    
        return await new NHLAPIService().getConference(conferenceId);
    }

    @Tags('NHL APIs')
    @Get('people/{personId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getPerson(personId: number, @Query() season?: string, 
    @Query() stats?: string): Promise<any> {
        const options: PeopleApiOptions = {
            season: season,
            stats: stats
        }
        return await new NHLAPIService().getPerson(personId, options);
    }
    
    @Tags('NHL APIs')
    @Get('people/{personId}/stats')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getPersonStats(personId: number, @Query() stats: string,
    @Query() season?: string): Promise<any> {
        const options: PeopleApiOptions = {
            season: season,
            stats: stats
        }
        return await new NHLAPIService().getPersonStats(personId, options);
    }
    
    @Tags('NHL APIs')
    @Get('game/{gameId}/live/feed')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getGameLiveFeed(gameId: number): Promise<any> {    
        return await new NHLAPIService().getGameLiveFeed(gameId);
    }
    
    @Tags('NHL APIs')
    @Get('game/{gameId}/live/feed/diffPatch')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getGameLiveFeedDiff(gameId: number, @Query() startTimecode: string): Promise<any> {
        const options: GameApiOptions = {
            startTimecode: startTimecode
        }   
        return await new NHLAPIService().getGameLiveFeedDiff(gameId, options);
    }
    
    @Tags('NHL APIs')
    @Get('game/{gameId}/boxscore')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getGameBoxscore(gameId: number): Promise<any> {    
        return await new NHLAPIService().getGameBoxscore(gameId);
    }
    
    @Tags('NHL APIs')
    @Get('game/{gameId}/content')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getGameContent(gameId: number): Promise<any> {    
        return await new NHLAPIService().getGameContent(gameId);
    }
    
    @Tags('NHL APIs')
    @Get('schedule')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getSchedule(@Query() date: string, @Query() expand: string,
    @Query() startDate: string, @Query() endDate: string, @Query() teamId: number): Promise<any> {
        const options: ScheduleApiOptions = {
            date: date,
            expand: expand,
            startDate: startDate,
            endDate: endDate,
            teamId: teamId
        }   
        return await new NHLAPIService().getSchedule(options);
    }
    
    @Tags('NHL APIs')
    @Get('standings')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getStandings(@Query() date: string, @Query() expand: string,
    @Query() season: string): Promise<any> {
        const options: StandingsApiOptions = {
            date: date,
            expand: expand,
            season: season
        }   
        return await new NHLAPIService().getStandings(options);
    }
    
    @Tags('NHL APIs')
    @Get('standingstypes')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getStandingsTypes(): Promise<any> {    
        return await new NHLAPIService().getStandingsTypes();
    }
    
    @Tags('NHL APIs')
    @Get('statstypes')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getStatsType(): Promise<any> {    
        return await new NHLAPIService().getStatsType();
    }
    
    @Tags('NHL APIs')
    @Get('draft/current')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getCurrentDraft(): Promise<any> {    
        return await new NHLAPIService().getDraft();
    }
    
    @Tags('NHL APIs')
    @Get('draft/{year}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getDraft(year: number): Promise<any> {    
        return await new NHLAPIService().getDraft(year);
    }

    @Tags('NHL APIs')
    @Get('prospects')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getProspects(): Promise<any> {    
        return await new NHLAPIService().getProspects();
    }

    @Tags('NHL APIs')
    @Get('prospects/{prospectId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getProspect(prospectId: number): Promise<any> {    
        return await new NHLAPIService().getProspect(prospectId);
    }
}