export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  SelectScreen: undefined;
  CustomScreen: undefined;
};

export type SelectScreenParamList = {
  SelectScreen: undefined;
  CharacterScreen: SelectableItemProps;
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
