export const SCALING_STYLES = {
  FULL: 'full',
  FIT: 'fit',
  FREE: 'free',
};

export const ARRANGEMENT = {
  CENTER_TOP: 'centertop',
  CENTER_BOTTOM: 'centerbottom',
  MIDDLE_LEFT: 'middleleft',
  MIDDLE_RIGHT: 'middleright',
  CENTER_MIDDLE: 'centermiddle',
};

export const SCALING_STYLE_BUTTONS = [
  {label: 'Full', key: SCALING_STYLES.FULL},
  {label: 'Fit', key: SCALING_STYLES.FIT},
  {label: 'Free', key: SCALING_STYLES.FREE},
];


export const API = {
  UPLOAD: 'media',
  WEBPAGE_SCREENSHOT: 'webpage/screenshot',
  TEMPLATE: 'template',
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
