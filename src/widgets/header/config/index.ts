export const headerConfig = {
  '/': {
    user: true,
    cartIcon: true,
    notificationIcon: true,
  },
  '/cart': {
    backRoute: true,
    centerName: true,
    notificationIcon: true,
    dots: true,
  },
};

export type HeaderRoute = keyof typeof headerConfig;

export type HeaderConfig = {
  user?: boolean;
  cartIcon?: boolean;
  notificationIcon?: boolean;
  backRoute?: boolean;
  centerName?: boolean;
  dots?: boolean;
};
