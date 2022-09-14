import {CustomArea, MapAreas} from "@mohamadtsn/react-img-mapper";

declare interface CountryDetail extends MapAreas, CustomArea {
    name: string,
}

declare type CountryInfo = {
    currency: string,
    capital: string,
    population: string,
    language: string,
    url: string | null,
}

declare type CountryState = {
    name: string | null,
}
