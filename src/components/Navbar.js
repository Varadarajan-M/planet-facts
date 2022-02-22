import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import planetdata from '../data/planet-data';

const planetNames = planetdata.map((p) => ({ name: p.name, color: p?.color }));

const NavBar = (props) => {
	const [activePlanetIdx, setActivePlanetIdx] = useState(0);
	const [navBarOpen, setNavBarOpen] = useState(false);
	const handleClick = (idx) => {
		props.getActivePlanet(planetdata[idx]);
		setActivePlanetIdx(idx);
		setNavBarOpen(false);
	};
	return (
		<Navbar
			collapseOnSelect
			className='d-flex fixed-top align-items-baseline justify-content-between nav-bar'
			expand='md'
		>
			<div className='brand'>
				<Navbar.Brand className='text-white' href='#'>
					The Planets
				</Navbar.Brand>
			</div>
			<div className='planet-menu'>
				<Navbar.Toggle
					style={{
						opacity: navBarOpen ? 0.2 : 1,
						transition: '0.2s all',
					}}
					onClick={() => setNavBarOpen(!navBarOpen)}
					aria-controls='menu'
					className='text-white'
				/>
				<Navbar.Collapse id='menu'>
					<Nav>
						<div className='planet-names-wrapper d-flex w-100 justify-content-between'>
							{planetNames.map((p, i) => {
								return (
									<div
										key={p.name}
										className='planet-menu-item'
									>
										<Nav.Link
											onClick={() => handleClick(i)}
											className={`text-white ${p.name} ${
												i === activePlanetIdx
													? 'current'
													: ''
											} `}
											href='#'
										>
											{p.name}
										</Nav.Link>
									</div>
								);
							})}
						</div>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};

export default NavBar;
