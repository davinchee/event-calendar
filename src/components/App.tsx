import React from 'react';
import '../styles/index.css';
import { Calendar } from './Calendar';

export interface IAppProps {}

export interface IAppState {
}

class App extends React.PureComponent<IAppProps, IAppState> {
	render() {
		return (
			<div className='container'>
				<h1 className='mt-5 text-center'>Event Calendar</h1>
				<Calendar />
			</div>
		);
	}
}

export default App;