import React, { Component } from 'react';
import ModalBody from './ModalBody';
import swal from 'sweetalert';
import axios from 'axios';
import { logout } from '../store/actions/authActions';
import { getAddress, openModal } from '../store/actions/addressActions';
import { connect } from 'react-redux';

class DataTable extends Component {
  state = {
    modalOpen: false,
    addressOject: null,
    modalComponent: null,
    userName: '',
  };

  changestate = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  delete = (id, name, fileName) => {
    var myhtml = document.createElement("div");
    myhtml.innerHTML = "<div>You are going to delete <b>"+name+"</b> address. </div>";
    swal({
        title: "Are you sure?",
        content: myhtml,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          axios.delete(`/api/address/${id}/${fileName}`)
          .then(response => {
            swal({
              title: "Thank You!",
              text: "Address Deleted Successfully.",
              icon: "success",
              timer: 4000
            });
            this.props.dispatch(getAddress(1,this.props.userID));
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

    view = value => {
      var self = this;
      axios.get('/api/address/id/' + value,)
      .then(response => {
        self.setState({ addressOject: response.data.address});
        self.props.dispatch(openModal(true));
      })
      .catch( error => {
        //console.log(error);
      });
    }

    addAddress = () => {
      this.changestate();
    }

    componentWillMount = () => {
      this.props.dispatch(getAddress(1, this.props.userID));
      this.setState({ userName: this.props.userData });
    }

    logout = () => {
      this.props.dispatch(logout(this.props.history));
    }

    openPopup = () => {
      this.setState( { addressOject: null } );
      this.props.dispatch( openModal(true) );
    }

    pagination = (value) => {
      this.props.dispatch(getAddress(value, this.props.userID));
    }

    render() {
    if (this.props.addresses === undefined) {
      return null;
    }

    let rows = this.props.addresses.map((item, index) => (
      <tr key={'tr' + index}>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.telephone_no}</td>
        <td>{item.email}</td>
        <td>
          <button className="mini ui button" onClick={() => this.view(item._id)}>
            <i className="user icon" />
            View
          </button>
          <button
            className="mini ui red button delete_icon"
            onClick={() => this.delete( item._id, item.name, item.image )}
          >
            <i className="delete icon" />
            Delete
          </button>
        </td>
      </tr>
    ));

    if (this.props.controlModal) {
      var modalComponent;
      if (this.state.addressOject) {
        modalComponent = (
          <ModalBody address={this.props.getAddress} action={() => this.changestate()} modelStatus={this.state.modalOpen} addresObj={this.state.addressOject}
          />
        );
      }
      else {
        modalComponent = <ModalBody address = {this.props.getAddress} action={() => this.changestate()} modelStatus = {this.state.modalOpen}/>;
      }
    }

      return (
        <div className="data_table">
          <h1 className="ui attached warning message table">
            <span id="address">Addresses</span>
            <span id="user_details">
              Welcome,  <b> { this.state.userName } </b>  |
              <span id="logout" onClick={this.logout}> Logout </span>
              <button className="ui teal button" onClick={this.openPopup}> <i className="plus square icon" />
                Add Address
              </button>
            </span>
          </h1>
          {this.props.addresses.length > 0 ? (
            <div>
              <table className="ui attached compact celled striped selectable table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Telephone No</th>
                    <th>Email</th>
                    <th className="extra" />
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
              <div className="ui pagination menu">
                <span
                  className={
                    this.props.page === 1
                      ? 'disabled item pagination'
                      : 'item pagination'
                  }
                  onClick={() => {
                    if (this.props.page === 1) {
                      return false;
                    }
                    this.pagination(this.props.page - 1);
                  }}
                >
                  ❮
                </span>
                <div className="item">
                  Page {this.props.page} of {this.props.maxPages}
                </div>
                <span
                  className={
                    this.props.page === this.props.maxPages
                      ? 'disabled item pagination'
                      : 'item pagination'
                  }
                  onClick={() => {
                    if (this.props.page === this.props.maxPages) {
                      return false;
                    }
                    this.pagination(this.props.page+1); 
                                       
                    <h1 className="ui attached warning message table">
                      <span id="address">Addresses</span>
                      <span id="user_details">
                        Welcome,  <b> { this.state.userName } </b>  |
                        <span id="logout" onClick={this.logout}> Logout </span>
                        <button className="ui teal button" onClick={this.openPopup}> <i className="plus square icon" />
                          Add Address
                        </button>
                      </span>
                    </h1>
                  {this.props.addresses.length > 0 ? (
                    <div>
                      <table className="ui attached compact celled striped selectable table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Telephone No</th>
                            <th>Email</th>
                            <th className="extra" />
                          </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                      </table>
                      <div className="ui pagination menu">
                        <span
                          className={
                            this.props.page === 1
                              ? 'disabled item pagination'
                              : 'item pagination'
                          }
                          onClick={() => {
                            if (this.props.page === 1) {
                              return false;
                            }
                            this.pagination(this.props.page - 1);
                          }}
                        >
                          ❮
                        </span>
                        <div className="item">
                          Page {this.props.page} of {this.props.maxPages}
                        </div>
                        <span
                          className={
                            this.props.page === this.props.maxPages
                              ? 'disabled item pagination'
                              : 'item pagination'
                          }
                          onClick={() => {
                            if (this.props.page === this.props.maxPages) {
                              return false;
                            }
                            this.pagination(this.props.page+1);
                          }}
                        >
                          ❯
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="ui attached compact center aligned segment big">
                      <div className="new_address">You dont't have any Address</div>
                      <div>
                        <button
                          className="ui teal button"
                          onClick={this.openPopup}
                        >
                          <i className="plus square icon" />
                          Add Address
                        </button>
                      </div>
                    </div>
                  )}
                  {modalComponent} }}
                >
                  ❯
                </span>
              </div>
            </div>
          ) : (
            <div className="ui attached compact center aligned segment big">
              <div className="new_address">You dont't have any Address</div>
              <div>
                <button
                  className="ui teal button"
                  onClick={this.openPopup}
                >
                  <i className="plus square icon" />
                  Add Address
                </button>
              </div>
            </div>
          )}
          {modalComponent}
        </div>
    );
  }
}

const mapStateToProps = state => ( {
    addresses: state.addressReducer.address.addresses,
    maxPages: state.addressReducer.address.maxPages,
    page: state.addressReducer.address.page,
    controlModal: state.addressReducer.controlModal,
    userData: state.authReducer.result.user_name,
    userID: state.authReducer.result._id
} );

export default connect(mapStateToProps)(DataTable);