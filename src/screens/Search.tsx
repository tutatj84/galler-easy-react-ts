import React, { FunctionComponent, useState } from "react"
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
											&limit=${limit + offset}\
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
	const [imageUrls, setImageUrls] = useState([''])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const searchResponse = await startSearching(txtSearch, Constants.SEARCH_LIMIT, offset)
		const imageInfos = searchResponse.data
		const imageAPIUrls: string[] = imageInfos.map((imageInfo: ImageInfo) => imageInfo.images.fixed_height.url)
		console.log(imageAPIUrls);

		setImageUrls(imageAPIUrls)
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
		</div>
	);
}

export default styled(Search)`
	padding: 2rem
`