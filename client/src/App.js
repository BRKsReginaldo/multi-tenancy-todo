import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
	state = {
		tasks: [],
		error: false
	};

	componentDidMount() {
		this.fetchTasks()
	}

	componentDidCatch(error, errorInfo) {
		console.log('errooou')

		this.setState({
			error: true
		})
	}

	fetchTasks = () => {
		axios.get('/api/tasks')
			.then(response => {
				this.setState({
					tasks: response.data
				})
			})
	};

	onSubmit = async event => {
		event.preventDefault();

		event.persist();

		const form = new FormData(event.target);
		const body = form.get('body');

		await axios.post('/api/tasks', {body});

		await this.fetchTasks();

		event.target.reset();

		return false
	};

	onToggle = task => async ev => {
		ev.preventDefault();

		await axios.put(`/api/tasks/${task.id}`);

		await this.fetchTasks();

		return false
	};

	onDelete = task => async ev => {
		ev.preventDefault()

		await axios.delete(`/api/tasks/${task.id}`)
		await this.fetchTasks()

		return false
	}

	render() {
		if (this.state.error)
			return (
				<div className="App">
					<h1>Ocorreu um erro inesperado, por favor <a onClick={() => window.location.reload()}>recarrege a pagina</a></h1>
				</div>
			);

		return (
			<div className="App">
				<form onSubmit={this.onSubmit}>
					<input type="text" placeholder="What needs to be done ?" name="body"/>
					<button>send</button>
				</form>

				<div style={{
					marginTop: '50px'
				}}>
					{this.state.tasks.map(task => (
						<div key={task.id}>

							<span>{task.body}</span>
							<button
								style={{
									border: 'none',
									padding: '5px 20px',
									borderRadius: '4px',
									backgroundColor: 'lightgreen',
									marginLeft: '16px'
								}}
								onClick={this.onToggle(task)}>{task.completed ? 'restore' : 'complete'}</button>
							<button
								style={{
									border: 'none',
									padding: '5px 20px',
									borderRadius: '4px',
									color: '#fff',
									backgroundColor: '#ee0000',
									marginLeft: '16px'
								}}
								onClick={this.onDelete(task)}>delete</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
