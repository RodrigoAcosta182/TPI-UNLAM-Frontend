import { Capacitor } from "@capacitor/core";
import { getPlatforms } from "@ionic/core";

export const isIosMobile = () => {
    if (getPlatforms()[0] === "ios" || getPlatforms()[0] === "iphone") {
        if (Capacitor.platform !== "web") {
          return true;
        } else {
          return false;
        }
      }
  };