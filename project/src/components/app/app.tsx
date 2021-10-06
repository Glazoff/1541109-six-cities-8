import MainPageScreen from '../main-page/main-page';
import {AppScreenProps} from '../../types/types';


function App({offerCount} : AppScreenProps): JSX.Element {
  return <MainPageScreen offerCount={offerCount}/>;
}

export default App;
