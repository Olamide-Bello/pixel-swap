import React, { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext({
    imageList: [],
    setImageList: () => { },
    matches: window.matchMedia("(max-width: 780px)").matches,
})

const GlobalState = ({ children }) => {
    const [imageList, setImageList] = useState([])
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 780px)").matches
    )

    useEffect(()=> {
        (async () => {
            const response = await fetch("https://pixabay.com/api/?key=39547463-9ce5bb40d2789750892309183&q=football&per_page=12&editors_choice=true&image_type=photo&pretty=true")
            if (response.ok) {
                const result = await response.json()
                const copy = result.hits
                copy.map(image => {
                    return (setImageList(
                        prevState => [
                            ...prevState,
                            { id: image.id, src: image.webformatURL, tags: image.tags }
                        ]
                    ))
                })
            }
        })
        ()
    }, [])

    useEffect(() => {
        window
            .matchMedia("(max-width: 780px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    const contextValue = {
        matches,
        imageList,
        setImageList
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState