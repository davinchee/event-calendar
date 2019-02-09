import React from 'react';
import { IsNullOrEmpty } from '../app/Utilities';

export interface ICalendarProps { }

export interface ICalendarState {
	readonly Date: string | null;
	readonly Event: string | null;
	readonly Events: IEvent[];
}

export class Calendar extends React.PureComponent<ICalendarProps, ICalendarState> {
	constructor(props: ICalendarProps) {
		super(props);

		this.state = {
			Date: null,
			Event: null,
			Events: []
		};
	}
	async componentDidMount() {
	}

	AddEvent = () => {
		const newEvent = {
			Id: this.state.Events.length + 1,
			Date: this.state.Date!,
			Event: this.state.Event!
		};
		this.setState({ Events: [...this.state.Events, newEvent] });
	}
	UpdateEvent = (id: number) => {
		const eventIds = this.state.Events.map(x => x.Id);
		const eventIndex = eventIds.indexOf(id);
		const newEvents = this.state.Events.slice();
	}
	RemoveEvent = (id: number) => {
		const updatedEvents = this.state.Events.filter(x => x.Id !== id);
		this.setState({ Events: updatedEvents });
	}
	HandleDiscardEntry = () => {
		this.setState({
			Date: '',
			Event: ''
		});
	}

	get IsAddEventButtonDisabled() {
		return IsNullOrEmpty(this.state.Date) || IsNullOrEmpty(this.state.Event);
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
						<span>{x.Event}</span>
					</div>
				)}
			</div>
		);
	}
}
