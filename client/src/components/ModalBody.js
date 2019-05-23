import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import ModalElement from './ModalElement'
import Auth from '../services/Auth'
import axios from 'axios';
import { connect } from 'react-redux';
import { addAddress, getAddress, openModal, deleteImage } from '../store/actions/addressActions';
import { Provider } from 'react-redux';
import store from '../store';

class ModalBody extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    telephone_no: '',
    photo_name: '',
    errors: '',
  };

  update = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  insertAddress = () => {
    if (this.state.name === '') {
      this.setState({ errors: 'Atleast Name is required' });
      return false;
    } else {
      this.setState({ errors: '' });
    }

    var address_data = {
      name: this.state.name,
      address: this.state.address,
      telephone_no: this.state.telephone_no,
      email: this.state.email,
      image: this.state.photo_name
    };
    //console.log(address_data);
    this.props.dispatch(addAddress(address_data));
  };

  closeModal = event => {
    var self = this;
    Array.prototype.find.call(event.target.childNodes, function (child) {
      if (child.textContent.includes('OK')) {
        self.props.dispatch(openModal(false));
      }
      else {
        var div = document.getElementById('addressModal');
        if (div.contains(event.target)) {
          return;
        }
        if (self.props.addresObj) {
          self.props.dispatch(openModal(false));
        }
        else {
          self.props.dispatch(deleteImage(self.state.photo_name));
          self.props.dispatch(openModal(false));
        }
      }
    });
  };

  componentWillMount() {
    document.addEventListener('mousedown', this.closeModal, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeModal, false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addaddress !== this.props.addaddress) {
      this.props.dispatch(openModal(false));
      this.props.dispatch(getAddress());
    }
    if (prevProps.uploadImage !== this.props.uploadImage) {
      this.setState({ photo_name: this.props.uploadImage.file });
    }
  }

  render() {
    return (
      <Modal id="addressModal" open={this.props.controlModal} onClose={this.props.action}>
        <Provider store={store}>
          {this.props.addresObj ? (
            <Modal.Header>Address Details</Modal.Header>
          ) : (
            <Modal.Header>Insert Address</Modal.Header>
          )}
          <Modal.Content>
              <ModalElement
                update={this.update}
                element={this.props.addresObj}
                errors = {this.state.errors}
                update_state_photo={this.update_state_photo}
                address={this.props.address}
                action={this.props.action}
              />
          </Modal.Content>

          <Modal.Actions>
            {this.props.addresObj ? (
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                onClick={this.closeModal}
                content="OK"
              />
            ) : (
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                onClick={this.insertAddress}
                content="Save"
              />
            )}
          </Modal.Actions>
        </Provider>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  controlModal: state.addressReducer.controlModal,
  addaddress: state.addressReducer.addaddress,
  uploadImage: state.addressReducer.uploadImage
});

export default connect(mapStateToProps)(ModalBody);