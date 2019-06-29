import React, { Component } from 'react';
import '../css/DataTable.css';
import EditableRow from './EditableRow';
import AddAddressForm from './AddAddressForm';
import axios from 'axios';
import { connect } from 'react-redux';
import { uploadImage } from '../store/actions/addressActions';

class ModalElement extends Component {
  state = {
    address_element: {
      name: false,
      email: false,
      address: false,
      telephone_no: false,
      image: false
    },
    photostatus: 'input',
    errors: '',
    photo_file: '',
    addressID: '',
  };

  cancle_photo = value => {
    if (this.props.element) {
      axios
      .post('/api/address/cancle_image/' + value+ '/'+ this.props.element._id)
      .then(response => { this.setState({ photostatus: 'input' }); })
      .catch(error => {
        //console.log(error);
      });
    } else {
      axios
      .post('/api/address/cancle_image/' + value)
      .then(response => { this.setState({ photostatus: 'input' }); })
      .catch(error => {
        //console.log(error);
      });
    }
  };

  uploadPhoto = event => {
      if (this.state.photostatus === 'input') {
        const targetFile = event.target.files[0];
        if (targetFile.type !== 'image/jpeg' && targetFile.type !== 'image/png' && targetFile.type !== 'image/jpg') {
          this.setState({ photostatus: 'input', errors: 'Please use .jpeg or .jpg or .png image' })
        }
        else if ( targetFile.size > 5120 ) {
          this.setState({ photostatus: 'input', errors: 'Please use below 5 Kilobytes size image' })
        }
        else {
          this.setState({ photostatus: 'bar' }, () => {
            let formData = new FormData();
            formData.append('addressImage', targetFile);
            var config = {
              onUploadProgress: progressEvent => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                var elem = document.getElementById('myBar');
                elem.style.width = percentCompleted + '%';
                if (percentCompleted === 100) {
                  elem.innerHTML = 'Upload Completed';
                } else {
                  elem.innerHTML = this.progress + '%';
                }
              }
            };

            var element_id;
            if (this.props.element) {
              element_id = this.props.element._id;
            } else {
              element_id = '';
            }
            this.props.dispatch(uploadImage(formData, config, element_id));
          });
      }
    }
  };

  componentDidMount = () => {
    this.setState({ photo_file: '' });
    if (this.props.element !== undefined) {
      // for view record
      this.setState({ photostatus: 'image', addressID: this.props.element._id });
      if (this.props.element.image === '') {
        this.setState({ photostatus: 'input' });
      }
    }
    else {
      this.setState({ photostatus: 'input' });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.uploadImage !== undefined) {
      if (nextProps.uploadImage.file !== undefined) {
        return ({ photostatus: 'image', photo_file: nextProps.uploadImage.file, errors: nextProps.erroraddAddress })
      }
    }
    return null;
  }

  makeInputBox = value => {
    var address_element = { ...this.state.address_element };
    Object.keys(address_element).map(item => {
      if (item === value) {
        return (address_element[value] = true);
      } else {
        return (address_element[item] = false);
      }
    });
    this.setState({ address_element });
  };


  image_element = () => {
    if (this.state.photostatus === 'bar') {
      var image_elements = (
        <div>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
        </div>
      );
      return image_elements;
    }

    if (this.state.photostatus === 'image') {
      if (this.props.element) {
        return (image_elements = (
          <div className="image_container">
            <span id="cancle_button_view" className="edit" onClick={() => { this.cancle_photo(this.props.element.image);}}>
              Edit
            </span>
              { this.state.photo_file ?
                <img alt="Address" src={ 'http://localhost:4000/uploads/' + this.state.photo_file } height="250" width="250"/>
              :
                <img alt="Address" src={ 'http://localhost:4000/uploads/' + this.props.element.image } height="250" width="250"/>
              }
          </div>
        ));
      } else {
        return (image_elements = (
          <div className="image_container">
            <span id="cancle_button_view" className="edit" onClick={() => { this.cancle_photo(this.props.uploadImage.file);}}>
              Edit
            </span>
            <img alt="Address" src={ 'http://localhost:4000/uploads/' + this.props.uploadImage.file } height="250" width="250"/>
          </div>
        ));
      }
    }

    if (this.state.photostatus === 'input') {
      return (image_elements = <input type="file" accept=".jpeg,.png,.jpg" onChange={this.uploadPhoto} />);
    }
  };

  render() {
    if (this.props.errors) {
      var errors = this.props.errors;
    }
    if (this.state.errors) {
      errors = this.state.errors;
    }

    if (this.props.element) {
      var rows = Object.keys(this.props.element)
      .filter(item => item !== '_id' && item !== '__v' && item !== 'owner')
      .map((item, index) => (
        <EditableRow
          key={index}
          index={index}
          item={item}
          element={this.props.element[item]}
          address_element={this.state.address_element}
          makeInputBox={this.makeInputBox}
          image_element={() => this.image_element()}
          addressID={this.state.addressID}
        />
      ));

      var modalelement = (
        <table className="ui attached compact celled striped selectable table">
          <tbody>{rows}</tbody>
        </table>
      );
    } else {
      modalelement = (
        <AddAddressForm
          errors={ errors }
          image_element={() => this.image_element()}
          onChange={this.props.update}
        />
      );
    }
    return <div>{modalelement}</div>;
  }
}

const mapStateToProps = state => ( {
  uploadImage: state.addressReducer.uploadImage,
  erroraddAddress: state.addressReducer.erroraddAddress,
} );

export default connect(mapStateToProps)(ModalElement);