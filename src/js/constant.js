const API_ENDPOINT = 'http://polls.apiblueprint.org/api/v1/';

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
  UPLOAD: API_ENDPOINT + 'media',
  WEBPAGE_SCREENSHOT: API_ENDPOINT + 'webpage/screenshot',
};
