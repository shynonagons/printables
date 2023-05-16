import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SelectableItemProps } from "../types"
import { pullIconFromName } from "../lib/pullIconFromName"
import Toast from "react-native-toast-message";

const MAX_FAVORITES = 40;

export default function useFavorites() {
    const [favorites, setFavorites] = useState<SelectableItemProps[]>([])
    
    useEffect(() => {
        (async () => {
        const faveKeys = (await AsyncStorage.getAllKeys()).filter(key => key.includes('favorite:'))
        const faves = await AsyncStorage.multiGet(faveKeys);
        const mappedFavorites: SelectableItemProps[] = faves.map(([key, fave]) => {
            return JSON.parse(fave || '')
        })
        setFavorites(mappedFavorites)})()
    }, [])

    const favorite = async (name: string) =>  {
        if (favorites.length >= MAX_FAVORITES) return Toast.show({ type: 'warning', text1: 'Too many favorites!' })

        const iconUri = await pullIconFromName(name)
        const fave = {name, uri: iconUri }
        setFavorites(prev => [...prev, fave])
        AsyncStorage.setItem(`favorite:${name}`, JSON.stringify(fave))
      }
      const unfavorite = async (name: string) => {
        setFavorites(prev => [...prev.filter((fave) => fave.name !== name)])
        AsyncStorage.removeItem(`favorite:${name}`)
      }
    return {favorites, favorite, unfavorite}
}