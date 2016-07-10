export const ActionTypes = {
  SELECT_MEDIA: 'SELECT_MEDIA',
  GET_MEDIA_SUCCESS: 'GET_MEDIA_SUCCESS',
  REMOVE_SELECTED_MEDIA: 'REMOVE_SELECTED_MEDIA',
};
export const SCALING_STYLES = {
  FILL: 'fill',
  FIT: 'fit',
  RESET: 'reset',
};

export const ARRANGEMENT = {
  FULL_SCREEN: 'fullscreen',
  CENTER_TOP: 'centertop',
  CENTER_BOTTOM: 'centerbottom',
  MIDDLE_LEFT: 'middleleft',
  MIDDLE_RIGHT: 'middleright',
  CENTER_MIDDLE: 'centermiddle',
};

export const SCALING_STYLE_BUTTONS = [
  {label: 'Fill', key: SCALING_STYLES.FILL},
  {label: 'Fit', key: SCALING_STYLES.FIT},
  {label: 'Reset', key: SCALING_STYLES.RESET},
];

export const API = {
  UPLOAD: 'asset/media/upload',
  WEBPAGE_SCREENSHOT: 'asset/web',
  TEMPLATE: 'content_package',
  MEDIA: 'asset',
};

export const INPUT_WEBSITE_URL_FORM_VALIDATOR = {
  websiteUrl: [
    {
      test: (value) => {
        return !!value;
      },
      errorMessage: 'Should not be empty',
    },
    {
      test: (value) => {
        return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value);
      },
      errorMessage: 'Please input a valid URL',
    },
  ],
};
export const INPUT_TEMPLATE_NAME_FORM_VALIDATOR = {
  templateName: [
    {
      test: (value) => {
        return !!value;
      },
      errorMessage: 'Should not be empty',
    },
  ],
};

export const ARRANGEMENT_BUTTONS = [
  {
    label: 'Full Screen',
    key: ARRANGEMENT.FULL_SCREEN,
    className: 'arrangement-full-button',
  },
  {
    label: 'Center',
    key: ARRANGEMENT.CENTER_MIDDLE,
    className: 'arrangement-center-button',
  },
  {
    label: 'Left',
    key: ARRANGEMENT.MIDDLE_LEFT,
    className: 'arrangement-left-button',
  },
  {
    label: 'Right',
    key: ARRANGEMENT.MIDDLE_RIGHT,
    className: 'arrangement-right-button',
  },
  {
    label: 'Top',
    key: ARRANGEMENT.CENTER_TOP,
    className: 'arrangement-top-button',
  },
  {
    label: 'Bottom',
    key: ARRANGEMENT.CENTER_BOTTOM,
    className: 'arrangement-bottom-button',
  },
];
