import { FunctionComponent, useContext, useEffect } from "react";
import ImagesContainer from "../components/ImagesContainer";
// context
import FavPicsContext from '../Context'

interface FavouriteProps {

}

const Favourite: FunctionComponent<FavouriteProps> = () => {

	const { favImages, setFavImages } = useContext(FavPicsContext)

	const getAllImageUrlFromStorage = () => {
		return Object.keys(localStorage)
	}

	useEffect(() => {
		setFavImages(getAllImageUrlFromStorage)
	}, [])

	return (
		<div className="fav">
			<ImagesContainer imageUrls={favImages} />
		</div>
	);
}

export default Favourite;