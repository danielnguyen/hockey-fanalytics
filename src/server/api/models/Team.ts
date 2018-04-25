import { Conference } from "./Conference";
import { Division } from "./Division";
import { Player, PlayerPosition } from "./Player";

export interface Team {
    id: number,
    name: string,
    link: string,
    venue?: TeamVenue,
    abbreviation?: string,
    teamName?: string,
    locationName?: string,
    firstYearOfPlay?: string,
    division?: Division,
    conference?: Conference,
    franchise?: Franchise,
    shortName?: string,
    officialSiteUrl?: string,
    franchiseId?: number,
    active?: boolean
}

export interface TeamVenue {
    name: string,
    link: string,
    city: string,
    timeZone: any
}

export interface Franchise {
    franchiseId: number,
    teamName: string,
    link: string
}

export interface Roster {
    person: Player,
    jerseyNumber: string,
    position: PlayerPosition
}

export interface Stats {

}

export interface StatRankings {
    
}