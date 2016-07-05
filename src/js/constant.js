export const SCALING_STYLES = {
  FILL: 'fill',
  FIT: 'fit',
  RESET: 'reset',
};

export const ARRANGEMENT = {
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
  TEMPLATE: 'content',
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
