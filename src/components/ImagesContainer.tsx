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
		height: '13rem',
		width: '13rem',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'contain',
		border: '1px solid gray',
		boxShadow: '3px 3px 10px rgb(0 0 0 / 50%)',
		borderImageSource: "uri('../asset/heart-bg.jpg')",
		borderImageSlice: '60 30'
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
`