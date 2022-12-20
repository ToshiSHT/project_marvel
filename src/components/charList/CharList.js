import {useState, useEffect, useRef ,useMemo} from 'react';
import PropTypes from  'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

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


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
     const [newItemLoading, setNewItemLoading] = useState(false);
     const [offset, setOffset] = useState(1200);
     const [charEnded, setCharEnded] = useState(false); 



   const {getAllCharacters, process, setProcess} = useMarvelService();

   useEffect(() => {
         onRequest(offset,true);
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
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset +9);
        setCharEnded(charEnded => ended)
    
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(() => setProcess('confirmed'))
    }
   const refItems = useRef([]);
    const onToggleClassActive = (i) => {
        refItems.current.forEach(item => item.classList.remove('char__item_selected'));
        refItems.current[i].classList.add('char__item_selected');
    }

    function renderItems(arr) {
        const items = arr.map((item,i) => {
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
 const elements = useMemo(() => {
    return setContent(process,() => renderItems(charList), newItemLoading)
 },[process])
    return (
        <div className="char__list">
          {elements}
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