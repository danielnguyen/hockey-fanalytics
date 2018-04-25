import * as HTTP_STATUS from 'http-status-codes';
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Tags } from 'tsoa';
import { PlayerService } from '../services/PlayerService';
import { Player } from '../models/Player';

@Route('players')
export class PlayersController extends Controller {

    // @Tags('Players')
    // @Get()
    // @SuccessResponse(HTTP_STATUS.OK, 'OK')
    // public async getTeams(): Promise<Players[]> {
    //     return await new PlayerService().getPlayers();
    // }

    @Tags('Players')
    @Get('{playerId}')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getTeam(playerId: number): Promise<Player> {
        return await new PlayerService().getPlayer(playerId);
    }
    
    @Tags('Players')
    @Get('{playerId}/stats')
    @SuccessResponse(HTTP_STATUS.OK, 'OK')
    public async getStats(playerId: number): Promise<Player> {
        return await new PlayerService().getStats(playerId);
    }
}