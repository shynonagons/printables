export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  SelectNavigator: undefined;
  CustomScreen: undefined;
};

export type SelectScreenParamList = {
  SelectScreen: undefined;
  SearchResultsScreen: SelectableItemProps;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type SelectableItemProps = {
  name: string;
  type?: string;
  uri?: string;
  searchTerm?: string;
  onSelect?: () => void;
};
