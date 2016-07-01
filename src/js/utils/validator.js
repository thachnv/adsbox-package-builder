export default {
  validateForm(form, validator) {
    let isValid = true;
    for (const key in validator) {
      if (validator.hasOwnProperty(key)) {
        const inputElem = form[key];
        const rules = validator[key];
        if (inputElem) {
          if (!this.validateInput(inputElem, rules)) {
            isValid = false;
          }
        }
      }
    }
    return isValid;
  },

  validateInput(inputElem, rules) {
    let isValid = true;
    let errorMessage = '';
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      isValid = rule.test(inputElem.value);
      if (!isValid) {
        errorMessage = rule.errorMessage || 'Invalid Input';
        break;
      }
    }

    if (!isValid) {
      $(inputElem).closest('.form-group').addClass('has-error');
      const helpBlockElem = $(inputElem).parent().find('.help-block');
      if (helpBlockElem.length > 0) {
        helpBlockElem.html(errorMessage);
      } else {
        $(inputElem).parent().append('<span class="help-block">' + errorMessage + '</span>');
      }
    } else {
      $(inputElem).closest('.form-group').removeClass('has-error');
      $(inputElem).parent().find('.help-block').remove();
    }
    return isValid;
  },
};
