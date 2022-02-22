import './App.scss';
import NavBar from './components/Navbar';
import { React, useState, useMemo } from 'react';
import planetData from './data/planet-data';
import PlanetWrapper from './components/PlanetWrapper';
import Box from './components/Box';

function App() {
	const [planetDetails, setPlanetDetails] = useState(planetData[0]);
	const getActivePlanet = (planetDetail) => {
		setPlanetDetails(planetDetail);
	};
	const boxData = useMemo(
		() => [
			{ title: 'Rotation Time', data: planetDetails.rotation },
			{ title: 'Revolution Time', data: planetDetails.revolution },
			{ title: 'Radius', data: planetDetails.radius },
			{ title: 'Average Temp.', data: planetDetails.temperature },
		],
		[planetDetails],
	);
	return (
		<div className='App'>
			<header className='App-header mb-2'>
				<NavBar getActivePlanet={getActivePlanet} />
			</header>
			<section className='planet-showcase-wrapper'>
				<PlanetWrapper planetDetails={planetDetails} />
			</section>
			<footer className='footer-wrapper d-flex'>
				{boxData.map((d, i) => {
					return <Box title={d.title} data={d.data} t />;
				})}
			</footer>
		</div>
	);
}

export default App;
