import React from "react"

type FavContext = {
  favImages: string[], 
  setFavImages: React.Dispatch<React.SetStateAction<string[]>>
}

const FavPicsContext = React.createContext<FavContext>({
  favImages: [], 
  setFavImages: () => {}
})

export default FavPicsContext