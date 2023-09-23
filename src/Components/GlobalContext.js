import React, { createContext, useEffect, useState } from 'react'
import { useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext({
    imageList: [],
    setImageList: () => { },
    loading: false,
    setLoading: () => { },
    setSignInModal: () => { },
    setSignUpModal: () => { },
    signInModal: false,
    signUpModal: false,
    searchValue: "",
    tags: [],
    handleChange: () => { },
    searchResult: [],
    setSearchResult: () => { },
    matches: window.matchMedia("(max-width: 780px)").matches,
})

const GlobalState = ({ children }) => {
    const [imageList, setImageList] = useState([])
    const [loading, setLoading] = useState(true)
    const [signInModal, setSignInModal] = useState(false)
    const [signUpModal, setSignUpModal] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [tags, setTags] = useState([])
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 780px)").matches
    )

    const handleChange = (e) => {
        const {value} = e.target
        setSearchValue(value)
    }

    useMemo(() => {
        const copy = imageList.map((each) => {
            return each.tags
        })
        const flat= copy.map((each)=>{ return each.split(', ')}).flat()
        const unique= new Set(flat)
        setTags([...unique])
    }, [imageList])

    useEffect(()=> {
        const getTagged = ()=> {
            const value = searchValue.trim().toLowerCase()
            const copy = [...imageList]
            const tagged = copy.filter(image => image.tags.includes(value))
            if(tagged && tagged.length > 0) {
                setSearchResult(()=>tagged)
            }
        }
        getTagged()
    }, [searchValue, imageList])

    useEffect(()=> {
        (async () => {
            setLoading(true)
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
        setImageList,
        loading,
        setLoading,
        setSignInModal,
        setSignUpModal,
        signInModal,
        signUpModal,
        handleChange,
        searchValue,
        tags,
        searchResult,
        setSearchResult
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState