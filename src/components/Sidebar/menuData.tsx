import { Menu } from "../../types/menu";
import {
  ExploreDisableIcon,
  ExploreEnableIcon,
  HomeDarkIcon,
  HomeLightIcon,
  NotificationsDisableIcon,
  NotificationsEnableIcon,
  ProfileDisableIcon,
  ProfileEnableIcon,
  ViralDisableIcon,
  ViralEnableIcon,
} from "../Svglist";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    enableIcon: <HomeDarkIcon />,
    disableIcon: <HomeLightIcon />,
  },
  // {
  //   id: 2,
  //   title: "On the viral",
  //   path: "/viral",
  //   enableIcon: <ViralEnableIcon />,
  //   disableIcon: <ViralDisableIcon />,
  // },
  {
    id: 3,
    title: "Explore",
    path: "/explore",
    enableIcon: <ExploreEnableIcon />,
    disableIcon: <ExploreDisableIcon />,
  },
  {
    id: 33,
    title: "Profile",
    path: "/profile",
    enableIcon: <ProfileEnableIcon />,
    disableIcon: <ProfileDisableIcon />,
  },
  // {
  //   id: 33,
  //   title: "Notifications",
  //   path: "/notifications",
  //   enableIcon: <NotificationsEnableIcon />,
  //   disableIcon: <NotificationsDisableIcon />,
  // },
];
export default menuData;
