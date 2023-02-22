import {VenueDB} from './venueDB';

export interface NewEventDialogData {
    name: string;
    imageUrl: string;
    venue: VenueDB;
    occureDateTime: number;
}