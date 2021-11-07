// react
import { FunctionComponent } from "react"
//lib
import styled from 'styled-components'

interface ImagesContainerProps {
	className?: string,
	imageUrls: string[]
}
interface ImageBoxProps {
	imageUrl: string
}

const ImageBox: FunctionComponent<ImageBoxProps> = (props) => {
	const { imageUrl } = props

	const imageStyle = {
		backgroundImage: `url(${imageUrl})`,
	}
	return (
		<div className="image-box"
			style={imageStyle}
		>

		</div>
	)
}

const ImagesContainer: FunctionComponent<ImagesContainerProps> = (props) => {
	const { className, imageUrls } = props

	const imageResults = imageUrls.map((imageUrl) =>
		<ImageBox key={imageUrl} imageUrl={imageUrl} />
	)

	return (
		<div className={className}>
			{imageResults}
		</div>
	)
}

export default styled(ImagesContainer)`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	.image-box {
		height: 13rem;
		width: 13rem;
		background-repeat: no-repeat;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		border: 1px solid gray;
		box-shadow: 3px 3px 10px rgb(0 0 0 / 50%);
		/* border-image-source: url('../asset/heart-bg.jpg'); */ // detect why
		border-image-source: url('https://i.pinimg.com/originals/da/12/2c/da122c8c0e992e937b19fcf815655848.jpg');
		border-image-slice: 60 30;
	}
`