import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import {Link} from 'react-router-dom';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);


     const { getCharacter, process, setProcess} = useMarvelService();

     useEffect(() => {
        updateChar();
     }, [])

     useEffect(() => {
        updateChar();
     },[props.charId]);
     

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))

    } 
    const onCharLoaded = (char) => {
        setChar(char);
    }



   

const View = ({data}) => {
    const {name, description,thumbnail,homepage,wiki,comics} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    let comicsVisible = !comics.length > 0 ? {display : "none"} :null;
    return (
        <>
            <div className="char__basics">
                
                    <img src={thumbnail} alt={name} style = {imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics" style ={comicsVisible}>Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.slice(0,10).map((item,i) => {
                            return(
                                <li key={i} className="char__comics-item">
                                   <Link to={`/comics/${item.resourceURI.slice(-4)}`}>{item.name}</Link> 
                                </li>
                            )
                        })
                    }
                   
                    
                </ul>
        </>

    )
}

return (
    <div className="char__info">
       {setContent(process,View,char)}
    </div>
)

}

CharInfo.propTypes = {
    charId: PropTypes.number
} 

export default CharInfo;