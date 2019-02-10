import React from 'react';
import * as moment from 'moment';
import { IsNullOrEmpty } from '../app/Utilities';

export interface IEventDetailsProps {
	readonly Event: IEvent;
	readonly DeleteEvent: (id: number) => void;
	readonly UpdateEvent: (id: number, description: string, date: string) => void;
}

export interface IEventDetailsState {
	readonly Date: string;
	readonly Description: string;
	readonly IsEditingEvent: boolean;
}

export class EventDetails extends React.PureComponent<IEventDetailsProps, IEventDetailsState> {
	constructor(props: IEventDetailsProps) {
		super(props);

		this.state = {
			Date: this.props.Event.Date,
			Description: this.props.Event.Description,
			IsEditingEvent: false
		};
	}

	get IsEditEventButtonDisabled() {
		return this.state.Date == null
			|| moment(this.state.Date).isValid() === false
			|| IsNullOrEmpty(this.state.Description);
	}

	HandleSelectDate = (date: any) => {
		this.setState({ Date: date });
	}
	HandleUpdateEvent = () => {
		this.props.UpdateEvent(this.props.Event.Id, this.state.Description, this.state.Date);
		this.setState({ IsEditingEvent: false });
	}

	render() {
		return (
			<div>
				<div className='d-flex justify-content-between'>
					<div className='d-flex flex-column justify-content-center w-100'>
						{this.state.IsEditingEvent === false &&
							<div className='d-flex justify-content-between'>
								<div className='d-flex flex-column'>
									<div className='d-flex align-items-center item-height'><span className='mr-2 font-weight-bold'>Date:</span> {this.props.Event.Date}</div>
									<div className='d-flex align-items-center item-height mt-3'><span className='mr-2 font-weight-bold'>Description:</span> {this.props.Event.Description}</div>
								</div>
								<div className='d-flex'>
									<i className='far fa-edit mr-3 action-icons' onClick={() => this.setState({ IsEditingEvent: true })} />
									<i className='far fa-trash-alt action-icons' onClick={() => this.props.DeleteEvent(this.props.Event.Id)} />
								</div>
							</div>
						}
						{this.state.IsEditingEvent === true &&
							<>
								<div className='d-flex align-items-center form-group item-height'>
									<label className='mb-0 font-weight-bold'>Date:</label>
									<input
										className='form-control ml-3'
										type='date'
										value={moment(this.state.Date).format('YYYY-MM-DD')}
										onChange={e => this.HandleSelectDate(e.target.value)} />
								</div>
								<div className='d-flex align-items-center form-group item-height'>
									<label className='mb-0 font-weight-bold'>Description:</label>
									<input
										className='form-control ml-3'
										type='text'
										value={this.state.Description}
										onChange={e => this.setState({ Description: e.target.value })} />
								</div>
								<div className='d-flex justify-content-end'>
									<button
										className='btn primary-btn pointer mr-3'
										disabled={this.IsEditEventButtonDisabled === true}
										onClick={() => this.HandleUpdateEvent()}>
										Save Changes
									</button>
									<button
										className='btn secondary-btn pointer'
										onClick={() => this.setState({ IsEditingEvent: false })}>
										Cancel
									</button>
								</div>
							</>
						}
					</div>
				</div>
			</div>
		);
	}
}
