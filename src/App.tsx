import { Calendar } from './components/Calendar';
import calendarIcon from './assets/calendar.png';

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-center">
					<img src={calendarIcon} className="w-10 h-10 mr-4" />
					<h1 className="text-3xl font-bold text-gray-900">Event Calendar</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<Calendar />
				</div>
			</main>
		</div>
	);
}

export default App;
