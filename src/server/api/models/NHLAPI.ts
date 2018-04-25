// Refer to the following for more details: https://github.com/dword4/nhlapi/blob/master/README.md#modifiers
export interface TeamsApiOptions {
    expand?: string,
    season?: string,
    stats?: string,
    teamId?: string
}

// Refer to the following for more details: https://github.com/dword4/nhlapi/blob/master/README.md#modifiers-1
export interface PeopleApiOptions {
    season?: string,
    stats?: string
}

//
export interface GameApiOptions {
    startTimecode: string // Format: yyyymmdd_hhmmss
}

// Refer to the following for more details: https://github.com/dword4/nhlapi/blob/master/README.md#modifiers-2
export interface ScheduleApiOptions {
    date?: string,
    expand?: string,
    startDate?: string,
    endDate?: string,
    teamId?: number
}

// Refer to the following for more details: https://github.com/dword4/nhlapi/blob/master/README.md#modifiers-3
export interface StandingsApiOptions {
    date?: string,
    expand?: string,
    season?: string
}