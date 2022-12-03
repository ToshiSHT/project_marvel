import {useState, useEffect, useRef } from 'react';
import PropTypes from  'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);
     const [newItemLoading, setNewItemLoading] = useState(false);
     const [offset, setOffset] = useState(1200);
     const [charEnded, setCharEnded] = useState(false); 


    let refItem = null;

   const marvelService = new MarvelService();

   useEffect(() => {
         onRequest();
   },[]);


//    const onCharLoadByScroll = () => {
//         let scrollHeight = Math.max(
//             (document.documentElement.scrollHeight, document.body.scrollHeight));
//          if (Math.floor(window.scrollY + document.documentElement.clientHeight) >= scrollHeight) {
//             onRequest(offset);
//          }
//     }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList,...newCharList])
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset +9);
        setCharEnded(charEnded => ended)
    
    }

    const onError = () => {
        setLoading(loading => false);
        setError(true);
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
        .getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError);

    }
    const onCharListLoading =() => {
        setNewItemLoading(true);
    }
   const refItems = useRef([]);
    const onToggleClassActive = (i) => {
        refItems.current.forEach(item => item.classList.remove('char__item_selected'));
        refItems.current[i].classList.add('char__item_selected');
    }

    function renderItems(arr) {
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex="0"
                    ref={el => refItems.current[i] = el}
                    key={item.id}
                    onKeyPress = {(e) => {
                        if (e.key === ' ' || e.key === 'Enpnter'){
                            props.onCharSelected(item.id);
                            onToggleClassActive(i);

                        }
                    }}
                    onClick={() =>{props.onCharSelected(item.id); onToggleClassActive(i)}}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


        
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
                disabled = {newItemLoading}
                style = {{'display' : charEnded ? 'none' : 'block'}}
                onClick = {() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )


}

CharList.propTypes = {
    onCharSelected : PropTypes.func.isRequired
}


export default CharList;