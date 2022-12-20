import './singleCharacterPage.scss';
import { useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import { useParams} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleCharacterPage = ({data}) => {

    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {getCharacter,clearError, process, setProcess}= useMarvelService();

    useEffect(() => {
        updateCharacter();
        }, [characterId])

    const updateCharacter = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }
    


    return (
       
            <>
                {setContent(process,View,character)}

            </>
    )
}


const View = ({data})=> {
    const {descriptionLong,thumbnail,name} = data;

    return (
             <div className="single-comic">
                 <Helmet>
                <meta
                  name="description"
                  content={`${name} character marvel`}
                />
                <title>{name}</title>
                 </Helmet>
                <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{descriptionLong}</p>
                </div>
            </div>
       
    )
}

export default SingleCharacterPage;