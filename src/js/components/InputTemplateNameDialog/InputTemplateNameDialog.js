import React from 'react';
import {Modal} from 'react-bootstrap';
import {API, INPUT_TEMPLATE_NAME_FORM_VALIDATOR} from '../../constant.js';
import api from '../../utils/api';
import Validator from '../../utils/Validator';

export default class UploadDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      templateName: '',
    };
  }

  done() {
    this.props.done(this.state.templateName);
  }

  change(e) {
    if (Validator.validateForm(this.refs.inputTemplateNameForm, INPUT_TEMPLATE_NAME_FORM_VALIDATOR)) {
      this.setState({
        templateName: e.target.value,
      });
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Input Template Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" ref="inputTemplateNameForm">
            <div className="form-group">
              <label className="control-label col-xs-2">Name</label>
              <div className="col-xs-10">
                <input onChange={this.change.bind(this)}
                       className="form-control" name="templateName"
                       placeholder="Input a name for the template"/>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary"
                  onClick={this.done.bind(this)}>OK
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
