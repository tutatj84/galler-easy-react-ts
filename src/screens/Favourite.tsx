import { FunctionComponent, useContext } from "react";
import ImagesContainer from "../components/ImagesContainer";
// context
import FavPicsContext from '../Context'

interface FavouriteProps {

}

const Favourite: FunctionComponent<FavouriteProps> = () => {

	const { favImages } = useContext(FavPicsContext)

	return (
		<div className="fav">
			<ImagesContainer imageUrls={favImages} />
		</div>
	);
}

export default Favourite;