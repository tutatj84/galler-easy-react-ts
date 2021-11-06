import React, { FunctionComponent, useState } from "react"
import styled from "styled-components";
import ImagesContainer from "../components/ImagesContainer";
import * as Constants from '../Constant'

interface SearchProps {
	className?: string
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
	const [txtSearch, setTxtSearch] = useState('')

	const { className } = props

	// config for search
	const limitSearch = 8
	const offsetSearch = 0

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = await startSearching(txtSearch, limitSearch, offsetSearch)
		console.log(data)
		
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
			<ImagesContainer />
		</div>
	);
}

export default styled(Search) `
	
`