import React from 'react';
import './homepage.styles.scss';
import Directory from '../../components/directory/directory.component'

export const HomePage = ({ history }) => (
	<div className="homepage">
		<Directory history={ history }/>
	</div>
)