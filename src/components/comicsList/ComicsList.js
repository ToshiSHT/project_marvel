import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffeset] = useState(1500);

    const {loading,error,getAllComics} = useMarvelService();

    useEffect(()=>{
        onRequest(offset);
    },[]);

    const onRequest = (offset) => {
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (comics) => {
        setComicsList(comicsList => [...comics]);

    }

  function renderItems(arr) {

    const items = arr.map((item) => {
        let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li className="comics__item">
                    <a href="#">
                        <img src={item.thumbnail}
                         style={imgStyle}
                         alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>

            )
    })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )

    }
    console.log(comicsList);
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;



    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
          
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;