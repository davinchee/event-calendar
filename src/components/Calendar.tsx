import React from 'react';
import CalendarDates from 'calendar-dates';

export interface ICalendarProps { }

export interface ICalendarState {
	readonly Date: string | null;
	readonly Dates: IDate[];
	readonly Event: string | null;
	readonly Events: IEvent[];
}
const calendarDates = new CalendarDates();

export class Calendar extends React.PureComponent<ICalendarProps, ICalendarState> {
	constructor(props: ICalendarProps) {
		super(props);

		this.state = {
			Date: null,
			Dates: [],
			Event: null,
			Events: []
		};
	}
	async componentDidMount() {
		const dates = await this.GetCurrentMonth();
		this.setState({ Dates: dates });
	}

	AddEvent = () => {

	}
	GetCurrentMonth = async () => {
		console.log(new Date());
		const dates = await calendarDates.getDates(new Date());
		console.log(dates);
		return dates;
	}
	HandleDiscardEntry = () => {
		this.setState({
			Date: '',
			Event: ''
		});
	}
	IsNullOrEmpty(text: string | null) {
		return text == null || text === '' || text.replace(/ /g, '').length === 0;
	}
	get IsAddEventButtonDisabled() {
		return this.IsNullOrEmpty(this.state.Date) || this.IsNullOrEmpty(this.state.Event);
	}
	render() {
		return (
			<div>
				<div className='row'>
					<div className='col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-4 col-lg-4'>
						<div className='d-flex flex-column form-group'>
							<label>Event</label>
							<input value={this.state.Event == null ? '' : this.state.Event} onChange={e => this.setState({ Event: e.target.value })} />
						</div>
						<div className='d-flex flex-column form-group'>
							<label>Date</label>
							<input value={this.state.Date == null ? '' : this.state.Date} onChange={e => this.setState({ Date: e.target.value })}></input>
						</div>
						<div className='d-flex justify-content-end'>
							<button
								className='btn btn-success pointer mr-3'
								disabled={this.IsAddEventButtonDisabled === true}>
								Save
							</button>
							<button className='btn btn-danger pointer' onClick={() => this.HandleDiscardEntry()}>Cancel</button>
						</div>
					</div>
				</div>
				{this.state.Events.map(x =>
					<div>
						<span>{x.Date.iso}</span>
						<span>{x.Event}</span>
					</div>
				)}
			</div>
		);
	}
}
