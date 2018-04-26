import * as HTTP_STATUS from "http-status-codes";
import * as request from "request";
import { 
    GameApiOptions, 
    TeamsApiOptions, 
    PeopleApiOptions, 
    ScheduleApiOptions,
    StandingsApiOptions 
} from "../models/NHLAPI";
import { Config } from "../../config";

export class NHLAPIService {

    /**
     * Common function to perform a GET request on the specified URL.
     * @param url URL to perform a GET call.
     * @param options Request options (optional)
     */
    private getResource(url: string, options?: any): Promise<any> {
        if (!options) {
            options = {};
        }
        return new Promise((resolve, reject) => {
            request.get(url, options, (error, res, body) => {
                if (!error && res.statusCode == HTTP_STATUS.OK) {
                  resolve(JSON.parse(body));
                } else {
                  reject(error);
                }
              });
        });
    }

    // Teams

    public getTeams(options?: TeamsApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/teams";
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    public getTeam(teamId: number, options?: TeamsApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/teams/" + teamId;
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }
    
    public getTeamRoster(teamId: number, options?: TeamsApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/teams/" + teamId + "/roster";
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    public getTeamStats(teamId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/teams/" + teamId + "/stats";
        return this.getResource(url);
    }

    // Divisions

    public getDivisions(): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/divisions";
        return this.getResource(url);
    }

    public getDivision(divisionId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/divisions/" + divisionId;
        return this.getResource(url);
    }
    

    // Conferences

    public getConferences(): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/conferences";
        return this.getResource(url);
    }

    public getConference(conferenceId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/conferences/" + conferenceId;
        return this.getResource(url);
    }

    // People

    public getPerson(personId: number, options?: PeopleApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/people/" + personId;
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    public getPersonStats(personId: number, options?: PeopleApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/people/" + personId + "/stats";
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    // Game

    public getGameLiveFeed(gameId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/game/" + gameId + "/feed/live";
        return this.getResource(url);
    }

    public getGameLiveFeedDiff(gameId: number, options: GameApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/game/" + gameId + "/feed/live/diffPatch";
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    public getGameBoxscore(gameId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/game/" + gameId + "/boxscore";
        return this.getResource(url);
    }

    public getGameContent(gameId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/game/" + gameId + "/content";
        return this.getResource(url);
    }

    // Schedule

    public getSchedule(options: ScheduleApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/schedule";
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    // Standings

    public getStandings(options: StandingsApiOptions): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/standings";
        let reqOptions = {
            qs: options
        }
        return this.getResource(url, reqOptions);
    }

    // Standings Types

    public getStandingsTypes(): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/standingsTypes";
        return this.getResource(url);
    }

    // Stats Type

    public getStatsType(): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/statTypes";
        return this.getResource(url);
    }

    // Draft

    public getDraft(year?: number): Promise<any> {
        let url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/draft";
        if (year) {
            url += "/" + year;
        }
        return this.getResource(url);
    }

    // Prospects

    public getProspects(): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/draft/prospects";
        return this.getResource(url);
    }

    public getProspect(prospectId: number): Promise<any> {
        const url = Config.NHL_STATSAPI_ENDPOINT + "/api/v1/draft/prospects/" + prospectId;
        return this.getResource(url);
    }


}