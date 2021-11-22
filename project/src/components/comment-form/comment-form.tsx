import { Dispatch, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {sendCommentOffer} from '../../store/action';


type CommentFormProps = {
  id: string,
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  sendComment(id: number, comment: string, rating: number) {
    dispatch(sendCommentOffer(id, comment, rating));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CommentFormProps;

function CommentFormScreen(props: ConnectedComponentProps): JSX.Element {
  const {id, sendComment} = props;

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  return (

    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">


        {/* map массив от 1 до 5 */}
        <input
          onChange={(evt) => { setRating(evt.target.value);}}
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt) => { setRating(evt.target.value); }}
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt) => { setRating(evt.target.value); }}
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt) => { setRating(evt.target.value); }}
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt) => { setRating(evt.target.value); }}
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>

      <textarea
        onChange={(evt) => { setComment(evt.target.value); }}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        // disabled={false} ToDO
        defaultValue={''}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          onClick={(evt) => {
            evt.preventDefault();
            sendComment(Number(id),comment, Number(rating));
          }}
          // onClick={() => { console.log('rating', rating); console.log('comment', comment); }}
          className="reviews__submit form__submit button"
          type="submit"
          //disabled={ текст, рейтинг, загрузка } TODO
        >
          Submit
        </button>
      </div>
    </form>

  );
}

export {CommentFormScreen};
export default connector(CommentFormScreen);
