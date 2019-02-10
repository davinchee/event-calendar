import React from 'react';
import * as moment from 'moment';
import { groupBy } from 'lodash';
import { IsNullOrEmpty } from '../app/Utilities';
import { EventDetails } from './Event';
import { EventModel } from '../models/EventModel';

export interface ICalendarProps { }

export interface ICalendarState {
	readonly Date: string | null;
	readonly Description: string | null;
	readonly Events: IEvent[];
}

export class Calendar extends React.PureComponent<ICalendarProps, ICalendarState> {
	constructor(props: ICalendarProps) {
		super(props);

		this.state = {
			Date: null,
			Description: null,
			Events: []
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
	HandleDiscardEntry = () => {
		this.setState({
			Date: null,
			Description: ''
		});
	}
	HandleSelectDate = (date: any) => {
		this.setState({ Date: date });
	}
	RemoveEvent = (id: number) => {
		const updatedEvents = this.state.Events.filter(x => x.Id !== id);
		this.setState({ Events: updatedEvents });
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

	get IsAddEventButtonDisabled() {
		return this.state.Date == null
			|| moment(this.state.Date).isValid() === false
			|| IsNullOrEmpty(this.state.Description);
	}
	get EventsSortedByAscendingDate() {
		return this.state.Events
			.sort((a, b) => moment(a.Date).isBefore(moment(b.Date)) ? -1 : 1)
			.map(x => new EventModel(x));
	}
	get GroupedEvents() {
		const eventsGroupedByMonthAndYear = groupBy(this.EventsSortedByAscendingDate, x => x.Month + ',' + x.Year);
		return Object.values(eventsGroupedByMonthAndYear);
	}

	render() {
		return (
			<div className='calendar-bg'>
				<div className='row'>
					<div className='offset-1 col-10 offset-md-2 col-md-8 offset-lg-4 col-lg-4'>
						<div className='d-flex flex-column form-group'>
							<label>Event</label>
							<input
								className='form-control'
								autoFocus
								placeholder='Add an Event'
								value={this.state.Description == null ? '' : this.state.Description}
								onChange={e => this.setState({ Description: e.target.value })} />
						</div>
						<div className='d-flex flex-column form-group'>
							<label>Date</label>
							<input
								className='form-control'
								type='date'
								value={this.state.Date == null ? '' : this.state.Date}
								onChange={e => this.HandleSelectDate(e.target.value)} />
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
					{this.EventsSortedByAscendingDate.length === 0 &&
						<div className='card mt-5 col-10 col-md-8 col-lg-6'>
							<div className='card-body'>
								You haven't added any events yet.
							</div>
						</div>
					}
					{this.EventsSortedByAscendingDate.length > 0 &&
						<div className='mt-4 mb-5 col-10 col-md-8 col-lg-6'>
							<h3 className='font-weight-bold'>Events</h3>
							{this.GroupedEvents.map((x, i) =>
								<div key={i} className='mt-5'>
									{x.map((y, i) =>
										<div key={y.Id}>
											{i === 0 && <h5 className='font-weight-light'>{y.FormattedDate}</h5>}
											<div key={y.Id} className='mt-3 card'>
												<div className='card-body'>
													<EventDetails Event={y} DeleteEvent={this.RemoveEvent} UpdateEvent={this.UpdateEvent} />
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					}
				</div>
			</div>
		);
	}
}
