/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { HealthController } from './../api/controllers/health';
import { TeamsController } from './../api/controllers/Teams';
import { NHLAPIController } from './../api/controllers/NHLAPI';

const models: TsoaRoute.Models = {
    "ResponseModel": {
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
        },
    },
    "TeamVenue": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "city": { "dataType": "string", "required": true },
            "timeZone": { "dataType": "any", "required": true },
        },
    },
    "Conference": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "abbreviation": { "dataType": "string" },
            "shortName": { "dataType": "string" },
            "active": { "dataType": "boolean" },
        },
    },
    "Division": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "abbreviation": { "dataType": "string" },
            "conference": { "ref": "Conference" },
            "active": { "dataType": "boolean" },
        },
    },
    "Franchise": {
        "properties": {
            "franchiseId": { "dataType": "double", "required": true },
            "teamName": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
        },
    },
    "Team": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "venue": { "ref": "TeamVenue" },
            "abbreviation": { "dataType": "string" },
            "teamName": { "dataType": "string" },
            "locationName": { "dataType": "string" },
            "firstYearOfPlay": { "dataType": "string" },
            "division": { "ref": "Division" },
            "conference": { "ref": "Conference" },
            "franchise": { "ref": "Franchise" },
            "shortName": { "dataType": "string" },
            "officialSiteUrl": { "dataType": "string" },
            "franchiseId": { "dataType": "double" },
            "active": { "dataType": "boolean" },
        },
    },
    "PlayerPosition": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "abbreviation": { "dataType": "string", "required": true },
        },
    },
    "Player": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "fullName": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "firstName": { "dataType": "string" },
            "lastName": { "dataType": "string" },
            "primaryNumber": { "dataType": "string" },
            "birthDate": { "dataType": "string" },
            "currentAge": { "dataType": "double" },
            "birthCity": { "dataType": "string" },
            "birthStateProvince": { "dataType": "string" },
            "birthCountry": { "dataType": "string" },
            "nationality": { "dataType": "string" },
            "height": { "dataType": "string" },
            "weight": { "dataType": "double" },
            "active": { "dataType": "boolean" },
            "alternateCaptain": { "dataType": "boolean" },
            "captain": { "dataType": "boolean" },
            "rookie": { "dataType": "boolean" },
            "shootsCatches": { "dataType": "string" },
            "rosterStatus": { "dataType": "string" },
            "currentTeam": { "ref": "Team" },
            "primaryPosition": { "ref": "PlayerPosition" },
        },
    },
    "Roster": {
        "properties": {
            "person": { "ref": "Player", "required": true },
            "jerseyNumber": { "dataType": "string", "required": true },
            "position": { "ref": "PlayerPosition", "required": true },
        },
    },
    "Stats": {
    },
    "StatRankings": {
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/HealthCheck',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new HealthController();


            const promise = controller.getHealth.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/teams',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamsController();


            const promise = controller.getTeams.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/teams/:teamId',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamsController();


            const promise = controller.getTeam.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/teams/:teamId/roster',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
                season: { "in": "query", "name": "season", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamsController();


            const promise = controller.getRoster.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/teams/:teamId/stats',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
                season: { "in": "query", "name": "season", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamsController();


            const promise = controller.getStats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/teams/:teamId/statrankings',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
                season: { "in": "query", "name": "season", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamsController();


            const promise = controller.getStatRankings.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/teams',
        function(request: any, response: any, next: any) {
            const args = {
                expand: { "in": "query", "name": "expand", "dataType": "string" },
                season: { "in": "query", "name": "season", "dataType": "string" },
                stats: { "in": "query", "name": "stats", "dataType": "string" },
                teamIDs: { "in": "query", "name": "teamIDs", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getTeams.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/teams/:teamId',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
                expand: { "in": "query", "name": "expand", "dataType": "string" },
                season: { "in": "query", "name": "season", "dataType": "string" },
                stats: { "in": "query", "name": "stats", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getTeam.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/teams/:teamId/roster',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
                expand: { "in": "query", "name": "expand", "dataType": "string" },
                season: { "in": "query", "name": "season", "dataType": "string" },
                stats: { "in": "query", "name": "stats", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getTeamRoster.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/teams/:teamId/stats',
        function(request: any, response: any, next: any) {
            const args = {
                teamId: { "in": "path", "name": "teamId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getTeamStats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/divisions',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getDivisions.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/divisions/:divisionId',
        function(request: any, response: any, next: any) {
            const args = {
                divisionId: { "in": "path", "name": "divisionId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getDivision.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/conferences',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getConferences.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/conferences/:conferenceId',
        function(request: any, response: any, next: any) {
            const args = {
                conferenceId: { "in": "path", "name": "conferenceId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getConference.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/people/:personId',
        function(request: any, response: any, next: any) {
            const args = {
                personId: { "in": "path", "name": "personId", "required": true, "dataType": "double" },
                season: { "in": "query", "name": "season", "dataType": "string" },
                stats: { "in": "query", "name": "stats", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getPerson.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/people/:personId/stats',
        function(request: any, response: any, next: any) {
            const args = {
                personId: { "in": "path", "name": "personId", "required": true, "dataType": "double" },
                stats: { "in": "query", "name": "stats", "required": true, "dataType": "string" },
                season: { "in": "query", "name": "season", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getPersonStats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/game/:gameId/live/feed',
        function(request: any, response: any, next: any) {
            const args = {
                gameId: { "in": "path", "name": "gameId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getGameLiveFeed.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/game/:gameId/live/feed/diffPatch',
        function(request: any, response: any, next: any) {
            const args = {
                gameId: { "in": "path", "name": "gameId", "required": true, "dataType": "double" },
                startTimecode: { "in": "query", "name": "startTimecode", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getGameLiveFeedDiff.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/game/:gameId/boxscore',
        function(request: any, response: any, next: any) {
            const args = {
                gameId: { "in": "path", "name": "gameId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getGameBoxscore.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/game/:gameId/content',
        function(request: any, response: any, next: any) {
            const args = {
                gameId: { "in": "path", "name": "gameId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getGameContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/schedule',
        function(request: any, response: any, next: any) {
            const args = {
                date: { "in": "query", "name": "date", "required": true, "dataType": "string" },
                expand: { "in": "query", "name": "expand", "required": true, "dataType": "string" },
                startDate: { "in": "query", "name": "startDate", "required": true, "dataType": "string" },
                endDate: { "in": "query", "name": "endDate", "required": true, "dataType": "string" },
                teamId: { "in": "query", "name": "teamId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getSchedule.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/standings',
        function(request: any, response: any, next: any) {
            const args = {
                date: { "in": "query", "name": "date", "required": true, "dataType": "string" },
                expand: { "in": "query", "name": "expand", "required": true, "dataType": "string" },
                season: { "in": "query", "name": "season", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getStandings.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/standingstypes',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getStandingsTypes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/statstypes',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getStatsType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/draft/current',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getCurrentDraft.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/draft/:year',
        function(request: any, response: any, next: any) {
            const args = {
                year: { "in": "path", "name": "year", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getDraft.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/prospects',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getProspects.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/nhl/prospects/:prospectId',
        function(request: any, response: any, next: any) {
            const args = {
                prospectId: { "in": "path", "name": "prospectId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NHLAPIController();


            const promise = controller.getProspect.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
