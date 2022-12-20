import './comicsList.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(1500);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false); 

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComics) => {
        let ended = newComics.length < 8 ;
        
        setComicsList(comicsList => [...comicsList,...newComics])
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setCharEnded(charEnded => ended)

    }

  function renderItems(arr) {

    const items = arr.map((item) => {
        let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li className="comics__item"
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail}
                         style={imgStyle}
                         alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>

            )
    })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )

    }
 


    return (
        <div className="comics__list">
            {setContent(process,() => renderItems(comicsList), newItemLoading)}
          
            <button className="button button__main button__long"
                    disabled = {newItemLoading}
                    style = {{'display' : charEnded ? 'none' : 'block'}}
                    onClick = {() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;