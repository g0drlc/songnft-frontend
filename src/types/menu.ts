export type Menu = {
  id: number;
  title: string;
  path?: string;
  enableIcon: any;
  disableIcon: any;
};

export type GetPageDataContextValue = {
  showSidebar: boolean;
  showSidebarFunc: (state: boolean) => void;
  showProfileDropdown: boolean;
  showProfileDropdownFunc: (state: boolean) => void;
  showLoginModal: boolean;
  showLoginModalFunc: (state: boolean) => void;
  loginState: boolean;
  music: collectionDataType[];
  setMusicFunc: (
    songImg: string,
    title: string,
    artistName: string,
    songUrl: string
  ) => void;
};

export type GetUserDataContextValue = {
  allUserDataForFollow: UserDataType[];
  topArtistsData: UserDataType[];
  getAllUserLoadingState: Boolean;
  userData: UserDataType;
  collectionData: collectionDataType [];
  setUserDataFunc: () => void;
  setUserDataChanger: (data: UserDataType) => void;
  getAllUser: () => Promise<void>;
  getAllUploadMusic: () => Promise<void>;
};

export type collectionDataType = {
  songImg: string;
  songTitle: string;
  songArtist: string;
  playCount: number;
  songUrl: string;
};

export type UserDataType = {
  name: string;
  userId: string;
  email: string;
  userWallet: string;
  bio: string;
  followers: FollowerType[];
  avatarImgUrl: string;
  bannerImgUrl: string;
  twitterUrl: string;
  discordUrl: string;
};

export type FollowersType = {
  name: string;
  userId: string;
  userWallet: string;
  userEmail: string;
  avatarImgUrl: string;
};

export type FollowerType = {
  name: string;
  userId: string;
  userWallet: string;
  userEmail: string;
  avatarImgUrl: string;
};

export type File = {
  uri: string;
  type: string;
};

export type Properties = {
  files: File[];
  category: string;
};

export type Attribute = {
  trait_type: string;
  value: string;
};

export type NFTMetaDataType = {
  name: string;
  symbol: string;
  description: string;
  external_url: string;
  seller_fee_basis_points: number;
  image: string;
  properties: Properties;
  attributes: Attribute[];
};
