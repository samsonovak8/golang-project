import { faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faVcard,
  faCubes,
  faTable,
  faLock,
  faNoteSticky,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "General information",
    path: "/",
    icon: faCubes,
  },
  {
    label: 'Couriers'
  },
  {
    label: "Couriers info",
    path: "/GetAllCouriers",
    icon: faVcard,
  },
  {
    label: "Add courier",
    path: "/PostCourier",
    icon: faWindows,
  },

  {
    label: 'Orders'
  },
  {
    label: "Orders info",
    path: "/GetOrders",
    icon: faTable,
  },
  {
    label: "Create order",
    path: "/PostOrder",
    icon: faWindows,
  },
  {
    label: "Complete order",
    path: "/GetOrders",
    icon: faCheckCircle,
  },

  {
    label: 'Authentication'
  },
  {
    label: "Login",
    path: "/auth/login",
    icon: faLock,
  },
  {
    label: "Register",
    path: "/auth/register",
    icon: faNoteSticky,
  },
];

export default initMenu
