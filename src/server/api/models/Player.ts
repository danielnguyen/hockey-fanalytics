import { Team } from "./Team";

// NHL Stats refers a player as "People"/"Person"
export interface Player {
    id: number,
    fullName: string,
    link: string,
    firstName?: string,
    lastName?: string,
    primaryNumber?: string,
    birthDate?: string,
    currentAge?: number,
    birthCity?: string,
    birthStateProvince?: string,
    birthCountry?: string,
    nationality?: string,
    height?: string,
    weight?: number,
    active?: boolean,
    alternateCaptain?: boolean,
    captain?: boolean,
    rookie?: boolean,
    shootsCatches?: string,
    rosterStatus?: string,
    currentTeam?: Team,
    primaryPosition?: PlayerPosition
}

export interface PlayerPosition {
    name: string,
    type: string,
    abbreviation: string
}