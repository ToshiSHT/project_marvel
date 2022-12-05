import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading , request, error, clearError} = useHttp();
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=bef47afeba63d5b0b43118f7c65754e3';
   const _baseOffset = 1200;
 

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.length > 195 ? char.description.slice(0, 195) + '...' : char.description : 'no description for this character',
            thumbnail:char.thumbnail.path +'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = 1500) => {
        const res = await request(`${_apiBase}comics?orderBy=-issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const _transformComics = (comics) => {
        return {
            thumbnail:comics.thumbnail.path +'.'+comics.thumbnail.extension,
            id: comics.id,
            title: comics.title,
            price:comics.prices.price + '$'
        }


    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
}

export default useMarvelService;