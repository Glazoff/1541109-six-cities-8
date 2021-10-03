import MainPageScreen from '../main-page/main-page';

type AppScreenProps = {
  offerCount: number;
}

function App({offerCount} : AppScreenProps): JSX.Element {
  return <MainPageScreen offerCount={offerCount}/>;
}

export default App;
