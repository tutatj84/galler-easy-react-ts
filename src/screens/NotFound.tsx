import { Link } from 'react-router-dom';
import styled from 'styled-components'

const NotFound = () => {
	return (
		<div className="not-found">
			<h2>Page Not Found!</h2>
			<p>
				<Link to='/'>Back to HomePage</Link>
			</p>
		</div>
	);
}

export default styled(NotFound)`
	
`