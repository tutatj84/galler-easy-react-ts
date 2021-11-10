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
		e.preventDefault()
		setImageUrls([])
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
			<button
				style={imageUrls.length ? {} : {display: 'none'}}
				onClick={handleFetchMore}
				className='fetch-more'
			>
				Fetch more!
			</button>
		</div>
	);
}

export default styled(Search)`
	form input {
		width: 65%;
    height: 2rem;
		border: 0;
    border-bottom: 2px solid gray;
    outline: none;
    font-size: 19px;
    margin-top: 1rem;
	}
	
	.images-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.fetch-more {
		outline: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 2rem;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    background-color: #e98392;
	}
	.fetch-more:hover {
		transform: scale(1.1);
	}
`