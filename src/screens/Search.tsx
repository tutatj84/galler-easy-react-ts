import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components";
import ImagesContainer from "../components/ImagesContainer";
import * as Constants from '../Constant'

interface SearchProps {
	className?: string
}
interface ImageInfo {
	images: {
		fixed_height:
		{ url: string }
	}
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
		boxShadow: '3px 3px 10px rgb(0 0 0 / 50%)'
	}
	return (
		<div className="image-box"
			style={imageStyle}
		>
		</div>
	)
}

const startSearching = async (keyword: string, limit: number, offset: number) => {
	const searchUrl = `${Constants.BASE_URL}?\
											api_key=${Constants.API_KEY}\
											&q=${keyword}\
											&limit=${limit}\
											&offset=${offset}\
										`
	const response = await fetch(searchUrl)
	const data = await response.json()
	return data
}

const Search: FunctionComponent<SearchProps> = (props) => {
	const { className } = props

	const [txtSearch, setTxtSearch] = useState('')
	const [offset, setOffset] = useState(0)
	const [imageUrls, setImageUrls] = useState<string[]>([])

	const fetchImages = async () => {
		const searchResponse = await startSearching(txtSearch, Constants.SEARCH_IMAGES_LENGTH, offset)
		const imageInfos = searchResponse.data
		const imageAPIUrls: string[] = imageInfos.map((imageInfo: ImageInfo) => imageInfo.images.fixed_height.url)
		setImageUrls(imageUrls => [...imageUrls, ...imageAPIUrls])
	}

	useEffect(() => {
		fetchImages()
	}, [offset])

	const handleSubmit = async (e: React.FormEvent) => {
		console.log('Submittt');
		
		e.preventDefault()
		if (txtSearch) {
			setOffset(0)
			await fetchImages()
		}
	}

	const handleFetchMore = async () => {
		console.log('Fetch MOreeee');
		setOffset(offset => offset + Constants.SEARCH_IMAGES_LENGTH)
	}

	return (
		<div className={className}>
			<form onSubmit={async (e) => await handleSubmit(e)}>
				<input
					type="text"
					placeholder='Enter a keyword here!'
					value={txtSearch}
					onChange={(e) => setTxtSearch(e.target.value)} />
			</form>
			<ImagesContainer imageUrls={imageUrls} />
			<button onClick={handleFetchMore}>Fetch more!</button>
		</div>
	);
}

export default styled(Search)`
	padding: 2rem;

	.images-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
`