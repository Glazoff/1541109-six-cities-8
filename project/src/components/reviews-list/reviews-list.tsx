import ReviewsCardScreen from '../reviews-card/reviews-card';

import dayjs from 'dayjs';

import {ReviewsListType} from '../../types/types';

function ReviewsListScreen(props: ReviewsListType): JSX.Element {
  const {comments} = props;


  const sortComments = comments.sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1);

  return (
    <ul className="reviews__list">
      {
        sortComments.slice(0, 10).map((comment) => (
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
