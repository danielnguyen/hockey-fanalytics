import { Conference } from "./Conference";

export interface Division {
    id: number,
    name: string,
    link: string,
    abbreviation?: string,
    conference?: Conference,
    active?: boolean
}