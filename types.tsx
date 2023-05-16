export type RootStackParamList = {
  Root: undefined;
  SearchResults: SelectableItemProps;
  NotFound: undefined;
};

export type BottomTabParamList = {
  SelectNavigator: undefined;
  CustomScreen: undefined;
};

export type SelectScreenParamList = {
  SelectScreen: undefined;
  SearchResults: SelectableItemProps;
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
