/* eslint-disable no-console */
import { Dispatch, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {sendCommentOffer} from '../../store/action';
import { State } from '../../types/state';

const COUNT_RATING = [
  {star: 5},
  {star: 4},
  {star: 3},
  {star: 2},
  {star: 1},
];

type CommentFormProps = {
  id: string,
}

const mapStateToProps = ({isCommentLoading}: State) => ({
  isCommentLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  sendComment(id: number, comment: string, rating: number) {
    dispatch(sendCommentOffer(id, comment, rating));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CommentFormProps;

function CommentFormScreen(props: ConnectedComponentProps): JSX.Element {
  const {id, sendComment, isCommentLoading} = props;

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const resetCommentForm = () => {
    setRating('');
    setComment('');
  };


  return (

    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {/* map массив от 1 до 5 */}
        {
          COUNT_RATING.map((ratingNumber) => (
            <>
              <input
                onChange={(evt) => {setRating(evt.target.value);}}
                className="form__rating-input visually-hidden"
                name={'rating'}
                value={ratingNumber.star}
                id={`${ratingNumber.star}-stars`}
                type="radio"
                checked={String(ratingNumber.star) === rating}
              />
              <label htmlFor={`${ratingNumber.star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </>
          ))
        }
      </div>

      <textarea
        onChange={(evt) => { setComment(evt.target.value); }}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isCommentLoading}
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
            resetCommentForm();
            console.log('rating', rating);
            console.log('comment', comment);
          }}
          className="reviews__submit form__submit button"
          type="submit"
          // {/*TODO* не забыть добавить сюда статус отправки/}
          disabled={comment.length < 50 || comment.length > 300 || rating === '' || isCommentLoading}
        >
          Submit
        </button>
      </div>
    </form>

  );
}

export {CommentFormScreen};
export default connector(CommentFormScreen);
