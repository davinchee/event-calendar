import React from 'react';
import '../styles/index.css';
import { Calendar } from './Calendar';

class App extends React.PureComponent {
	render() {
		return (
			<div className='row d-flex flex-column w-100 align-items-center m-0'>
				<div className='event-calendar-container col-11 col-sm-10 col-md-8 col-lg-8 col-xl-6 mt-5'>
					<h1 className='mt-5 text-center'>Event Calendar</h1>
					<Calendar />
				</div>
			</div>
		);
	}
}

export default App;