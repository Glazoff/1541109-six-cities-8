import {SortItem, SortItemType} from '../../const';
import {Dispatch, useState} from 'react';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import {selectStateSort} from '../../store/action';

const mapStateToProps = ({stateSortOffers}: State) => ({
  stateSortOffers,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setStateSort(state: SortItemType) {
    dispatch(selectStateSort(state));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SortItemScreen(props: PropsFromRedux): JSX.Element {
  const {stateSortOffers, setStateSort} = props;

  const [stateSortList, setStateSortList] = useState(false);


  //todo useState или redux, после выбора список закрывается
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          stateSortList? setStateSortList(false):setStateSortList(true);
        }}
      >

        {stateSortOffers}

        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>


      <ul
        className={`places__options places__options--custom ${stateSortList? 'places__options--opened': false}`}
      > {/* todo */}

        {
          SortItem.map((item) => (
            <li
              key={item.value}
              className="places__option "
              tabIndex={0}
              onClick={() => {
                setStateSort(item.value);
                setStateSortList(false);
              }}
            >
              {item.value}
            </li>))
        }

        {/* <li className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li className="places__option" tabIndex={0}>Price: low to high</li>
        <li className="places__option" tabIndex={0}>Price: high to low</li>
        <li className="places__option" tabIndex={0}>Top rated first</li> */}
      </ul>
    </form>
  );
}

export default connector(SortItemScreen);
