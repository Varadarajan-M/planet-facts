import React, { useState, useEffect } from 'react';
import { Figure } from 'react-bootstrap';
import Image from './Image';
import IconS from '../assets/images/icon-source.svg';

const PlanetWrapper = ({ planetDetails }) => {
	const [image, setImage] = useState(null);
	const [description, setDescription] = useState(null);
	const [isGeology, setIsGeology] = useState(false);
	const [link, setLink] = useState('');
	const [activeBtn, setActiveBtn] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const buttons = ['Overview', 'Internal', 'Geology'];

	const btnClickHandler = (idx) => {
		const data = planetDetails[`${buttons[idx].toLowerCase()}`];
		setActiveBtn(idx);
		switch (idx.toString()) {
			case '0':
				setDescription(data.content);
				setImage(planetDetails.images.overview);
				setLink(data.source);
				setIsGeology(false);
				break;
			case '1':
				setDescription(planetDetails[`structure`].content);
				setLink(planetDetails[`structure`].source);
				setImage(planetDetails.images.structure);
				setIsGeology(false);
				break;
			case '2':
				setDescription(data.content);
				setIsGeology(true);
				setLink(data.source);
				setImage(planetDetails.images.overview);
				break;
			default:
				return;
		}
	};
	useEffect(() => {
		setDescription(planetDetails?.overview?.content ?? '');
		setIsGeology(false);
		setImage(planetDetails?.images?.overview ?? null);
		setActiveBtn(0);
		setLink(planetDetails?.overview?.source);
	}, [planetDetails]);

	useEffect(() => {
		if (window.screen.width < 768 || window.innerWidth < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [image]);
	return (
		<>
			<div className='planet-image'>
				<Figure>
					<div className='images'>
						<Image className='planet-image' src={image} />
						{isGeology && (
							<Image
								className='planet-geology-image'
								src={planetDetails.images.geology}
								width={200}
								height={200}
							/>
						)}
					</div>
				</Figure>
			</div>
			<div className='planet-action-data'>
				<div className='text-part'>
					<div className='text-white planet-name'>
						{planetDetails.name ?? ''}
					</div>
					<div className='info-text text-'>{description}</div>
					<div className='mt-3 p source'>
						Source : &nbsp;
						<a className='wiki' href={link}>
							Wikipedia
							<Image src={IconS} className='ms-1 ' />
						</a>
					</div>
				</div>
				<div className='action-buttons mt-4 d-flex'>
					{buttons.map((b, i) => (
						<button
							className={`action-btn ${
								activeBtn === i ? 'active' : 'inactive'
							}`}
							style={{
								backgroundColor:
									!isMobile && activeBtn === i
										? planetDetails?.color ?? ''
										: 'inherit',
								color:
									isMobile && activeBtn === i
										? '#fff' ?? ''
										: '',
								borderBottom:
									isMobile && activeBtn === i
										? `4px solid ${
												planetDetails?.color ?? ''
										  }`
										: ' ',
							}}
							onClick={() => btnClickHandler(i)}
						>
							{!isMobile && (
								<span className='btn-no'>0{i + 1}</span>
							)}
							<span
								className={`btn-text option-${i}`}
								style={{ letterSpacing: '2px' }}
							>
								{b}
							</span>
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default PlanetWrapper;
