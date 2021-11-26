import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {  Fragment, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {sendCommentOffer} from '../../store/action';
import { State } from '../../types/state';
import {COUNTS_RATING, RestrictionForInput} from '../../const';

type CommentFormProps = {
  id: string,
}

const mapStateToProps = ({isCommentLoading}: State) => ({
  isCommentLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, AxiosInstance, AnyAction>) => ({
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
        {
          COUNTS_RATING.map((ratingNumber) => (
            <Fragment key={String(ratingNumber.star)}>
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
            </Fragment>
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
          }}
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < RestrictionForInput.MiniInit || comment.length > RestrictionForInput.MaxInit || rating === RestrictionForInput.EmptyStart || isCommentLoading}
        >
          Submit
        </button>
      </div>
    </form>

  );
}

export {CommentFormScreen};
export default connector(CommentFormScreen);
