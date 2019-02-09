import React from 'react';
import * as moment from 'moment';
import { IsNullOrEmpty } from '../app/Utilities';
import { EventDetails } from './Event';

export interface ICalendarProps { }

export interface ICalendarState {
	readonly Date: string | null;
	readonly Description: string | null;
	readonly Events: IEvent[];
	readonly Months: ReadonlyArray<number>;
	readonly Years: ReadonlyArray<number>;
}

export class Calendar extends React.PureComponent<ICalendarProps, ICalendarState> {
	constructor(props: ICalendarProps) {
		super(props);

		this.state = {
			Date: null,
			Description: null,
			Events: [{ Id: 0, Date: '02/10/2019', Description: 'Test' }],
			Months: [],
			Years: []
		};
	}

	AddEvent = () => {
		const newEvent = {
			Id: this.state.Events.length + 1,
			Date: moment(this.state.Date!).format('L'),
			Description: this.state.Description!
		};
		this.setState({
			Events: [...this.state.Events, newEvent],
			Date: null,
			Description: ''
		});
	}
	UpdateEvent = (id: number, description: string, date: string) => {
		const eventIndex = this.state.Events
			.map(x => x.Id)
			.indexOf(id);
		const updatedEvents = this.state.Events.slice();
		updatedEvents[eventIndex] = {
			Id: id,
			Description: description,
			Date: moment(date).format(('L'))
		};
		this.setState({ Events: updatedEvents });
	}
	RemoveEvent = (id: number) => {
		const updatedEvents = this.state.Events.filter(x => x.Id !== id);
		this.setState({ Events: updatedEvents });
	}
	HandleDiscardEntry = () => {
		this.setState({
			Date: null,
			Description: ''
		});
	}
	HandleSelectDate = (date: any) => {
		this.setState({ Date: date });
	}

	get IsAddEventButtonDisabled() {
		return this.state.Date == null || moment(this.state.Date).isValid() === false || IsNullOrEmpty(this.state.Description);
	}
	get EventsSortedByDate() {
		return this.state.Events.sort((a, b) => moment(a.Date).isBefore(moment(b.Date)) ? -1 : 1);
	}

	render() {
		return (
			<div className='calendar-bg'>
				<div className='row'>
					<div className='offset-1 col-10 offset-md-2 col-md-8 offset-lg-4 col-lg-4'>
						<div className='d-flex flex-column form-group'>
							<label>Event</label>
							<input className='form-control' value={this.state.Description == null ? '' : this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
						</div>
						<div className='d-flex flex-column form-group'>
							<label>Date</label>
							<input className='form-control' type='date' value={this.state.Date == null ? '' : this.state.Date} onChange={e => this.HandleSelectDate(e.target.value)} />
						</div>
						<div className='d-flex justify-content-end'>
							<button
								className='btn primary-btn pointer mr-3'
								disabled={this.IsAddEventButtonDisabled === true}
								onClick={() => this.AddEvent()}>
								Save
							</button>
							<button className='btn secondary-btn pointer' onClick={() => this.HandleDiscardEntry()}>Cancel</button>
						</div>
					</div>
				</div>
				<div className='events-container row'>
					{this.EventsSortedByDate.length === 0 &&
						<div className='card mt-5 col-10 col-md-8 col-lg-6'>
							<div className='card-body'>
								You haven't added any events yet.
							</div>
						</div>
					}
					{this.EventsSortedByDate.length > 0 &&
						<div className='my-4 col-10 col-md-8 col-lg-6'>
							<h3>Events</h3>
							{this.EventsSortedByDate.map(x =>
								<div key={x.Id} className='mt-3'>
									<EventDetails Event={x} DeleteEvent={this.RemoveEvent} UpdateEvent={this.UpdateEvent} />
								</div>
							)}
						</div>
					}
				</div>
			</div>
		);
	}
}
