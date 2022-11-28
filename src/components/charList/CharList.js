import { Component } from 'react';
import PropTypes from  'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


class CharList extends Component {

    state = {
        charList : [],
        loading: true,
        error: false,
        newItemLoading : false,
        offset : 1200,
        charEnded : false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
        //window.addEventListener('scroll', this.onCharLoadByScroll); добавление карточек при скроле
    }
    // componentWillUnmount(){
    //     window.removeEventListener('scroll',this.onCharLoadByScroll);
    // }

    onCharLoadByScroll = () => {
        let scrollHeight = Math.max(
            (document.documentElement.scrollHeight, document.body.scrollHeight));
         if (Math.floor(window.scrollY + document.documentElement.clientHeight) >= scrollHeight) {
            this.onRequest(this.state.offset);
         }
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({charList, offset}) => ({
            charList: [...charList,...newCharList],
            loading: false,
            newItemLoading : false,
            offset: offset+9,
            charEnded: ended}))
    }

    onError=() => {
        this.setState({
            loading: false,
            error: true})
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
        .getAllCharacters(offset)
        .then( this.onCharListLoaded)
        .catch(this.onError);

    }
    onCharListLoading =() => {
        this.setState({newItemLoading : true})
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
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


        
    
   render() {
    const {charList, loading, error,offset,newItemLoading, charEnded} = this.state;
        
    const items = this.renderItems(charList);

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
                onClick = {() => this.onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }


}

CharList.propTypes = {
    onCharSelected : PropTypes.func.isRequired
}


export default CharList;