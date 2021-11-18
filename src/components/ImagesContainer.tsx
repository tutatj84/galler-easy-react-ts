// react
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react"
//lib
import styled from 'styled-components'
import FavPicsContext from "../FavPicsContext"

interface ImagesContainerProps {
	className?: string,
	imageUrls: string[]
}
interface ImageBoxProps {
	imageUrl: string,
}

const checkIsFav = (imageUrl: string) => {
	const isFav: boolean = !!window.localStorage.getItem(imageUrl)
	return isFav
}

const getAllImageUrlFromStorage = () => {
	return Object.keys(localStorage)
}

const ImageBox: FunctionComponent<ImageBoxProps> = (props) => {
	const { imageUrl } = props

	const [isFav, setIsFav] = useState(false)
	const [mainGifUrl, setMainGifUrl] = useState('')
	const isFavRef = useRef<boolean>()
	const { setFavImages } = useContext(FavPicsContext)

	const loadingGifUrl = 'https://img.pikbest.com/58pic/35/39/61/62K58PICb88i68HEwVnm5_PIC2018.gif!w340'

	useEffect(() => {
		const imageHelper = new Image()
		imageHelper.src = imageUrl
		imageHelper.onload = () => {
			setMainGifUrl(imageUrl)
		}
	}, [])

	const toggleFavStatus = (key: string) => {
		isFavRef.current = !isFav
		setIsFav(isFav => !isFav)
		if (isFavRef.current) {
			window.localStorage.setItem(imageUrl, imageUrl)
			setFavImages(getAllImageUrlFromStorage)
		} else {
			window.localStorage.removeItem(imageUrl)
			setFavImages(getAllImageUrlFromStorage)
		}
	}

	const imageStyle = {
		backgroundImage: `url(${mainGifUrl || loadingGifUrl})`,
	}

	useEffect(() => {
		checkIsFav(imageUrl) && setIsFav(true)
	},[])

	return (
		<div
			className={`image-box ${isFav ? 'favourite-border' : ''}`}
			style={imageStyle}
			onClick={() => toggleFavStatus(imageUrl)}
		>
		</div>
	)
}

const ImagesContainer: FunctionComponent<ImagesContainerProps> = (props) => {
	const { className, imageUrls } = props

	const noImageNoti = <p>
		<h1>No Image Here 💔</h1>
	</p>

	const imageResults = imageUrls.map((imageUrl) =>
		<ImageBox
			key={imageUrl}
			imageUrl={imageUrl}
		/>
	)

	return (
		<div className={className}>
			{ imageUrls.length ? imageResults : noImageNoti}
		</div>
	)
}

export default styled(ImagesContainer)`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 2rem;
	justify-content: center;

	.image-box {
		height: 13rem;
		width: 13rem;
		background-repeat: no-repeat;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		border: 1px solid gray;
		box-shadow: 3px 3px 10px rgb(0 0 0 / 50%);
		cursor: pointer;
		/* border-image-source: url('../asset/heart-bg.jpg'); */ // detect why
	}
	.favourite-border {
		border: .5rem solid;
		border-image-source: url('https://i.pinimg.com/originals/da/12/2c/da122c8c0e992e937b19fcf815655848.jpg');
		border-image-slice: 30 30;
	}

`