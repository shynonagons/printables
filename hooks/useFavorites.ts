import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectableItemProps } from "../types"
import { pullIconFromName } from "../lib/pullIconFromName"

const DEFAULT_ITEM_URI = ''

export default function useFavorites() {
    const [favorites, setFavorites] = useState<SelectableItemProps[]>([])

    useEffect(() => {
        (async () => {
        const storedFavorites = (await AsyncStorage.getAllKeys()).filter(key => key.includes('favorite:'))
        const mappedFavorites: SelectableItemProps[] = storedFavorites.map(name => (
            {
                name: name.split('favorite:')[1],
                uri: DEFAULT_ITEM_URI

            }
        ))
        setFavorites(mappedFavorites)})()
    }, [])
    const favorite = async (name: string) =>  {
        const icon = await pullIconFromName(name)
        setFavorites(prev => [...prev, {name, uri: DEFAULT_ITEM_URI}])
        AsyncStorage.setItem(`favorite:${name}`, name)
      }
      const unfavorite = async (name: string) => {
        setFavorites(prev => [...prev.filter((fave) => fave.name !== name)])
        AsyncStorage.removeItem(`favorite:${name}`)
      }
    return {favorites, favorite, unfavorite}
}