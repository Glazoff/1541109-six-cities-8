import ReviewsCardScreen from '../reviews-card/reviews-card';

import {ReviewsListType} from '../../types/types';

function ReviewsListScreen(props: ReviewsListType): JSX.Element {
  const {comments} = props;

  return (
    <ul className="reviews__list">
      {
        comments.map((comment) => (
          <ReviewsCardScreen
            key={comment.id}
            commentProps={comment}
          />
        ))
      }
    </ul>
  );
}

export default ReviewsListScreen;
