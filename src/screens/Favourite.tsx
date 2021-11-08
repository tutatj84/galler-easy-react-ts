import { FunctionComponent, useContext } from "react";
// context
import FavPicsContext from '../Context'

interface FavouriteProps {

}

const Favourite: FunctionComponent<FavouriteProps> = () => {

	const { favImages, setFavImages } = useContext(FavPicsContext)

	return (
		<div className="fav">
			Favourite Screen
		</div>
	);
}

export default Favourite;