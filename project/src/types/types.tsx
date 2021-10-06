// Завел два типа  для компонента App и для menu, с расчетом на то что, для разных компонентов могут передаваться
// пропсы с разными типами.

export type MainPageProps = {
  offerCount: number;
}

export type AppScreenProps = {
  offerCount: number;
}
