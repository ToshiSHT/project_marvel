import './singleCharacterLayout.scss';
import { useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import { useParams} from 'react-router-dom';

const SingleCharacterLayout = ({data}) => {

    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {loading,error,getCharacter,clearError}= useMarvelService();

    useEffect(() => {
        updateCharacter();
        }, [characterId])

    const updateCharacter = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
    }
    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/>: null ;
    const content = !(loading || error || !character) ? <View character={character}/> : null;

    return (
       
            <>
            {errorMessage}
            {spinner}
            {content}

            </>
    )
}


const View = ({character})=> {
    console.log(character);
    const {descriptionLong,thumbnail,name} = character;

    return (
             <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{descriptionLong}</p>
                </div>
            </div>
       
    )
}

export default SingleCharacterLayout;