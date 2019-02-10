import * as moment from 'moment';

export class EventModel implements IEvent {
	readonly Id: number;
	readonly Date: string;
	readonly Description: string;

	constructor(model: IEvent) {
		this.Id = model.Id;
		this.Date = model.Date;
		this.Description = model.Description;
	}

	get Month() {
		return moment(this.Date).month();
	}
	get Year() {
		return moment(this.Date).year();
	}
	get FormattedDate() {
		return this.Year + ' - ' + moment.months(this.Month);
	}
}