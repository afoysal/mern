import React, { Component } from 'react';
import { getAddress, openModal } from '../store/actions/addressActions';
import axios from 'axios';
import { connect } from 'react-redux';

class EditableRow extends Component {
    state = {
        inputValue: ''
    }
    componentWillMount = () => {
        this.setState({
            inputValue: this.props.element
        });
    };
    get_value = event => {
        this.setState({
            inputValue: event.target.value
        });
    };
    update = value => event => {
        event.preventDefault();
        if (typeof this.state.inputValue !== 'undefined') {
            var address_data = { [value]: this.state.inputValue };
            axios.put('/api/address/' + this.props.addressID, address_data)
                .then(response => {
                this.props.dispatch(getAddress( this.props.page, this.props.userID ));
                this.props.dispatch(openModal(false));
            })
            .catch(error => {
                //console.log(error);
            });
        }
    };

    render() {
        return (<tr key={this.props.index}>
            <td className="ui header data_type">
                {this.props.item === 'name' ? 'Name' : null}
                {this.props.item === 'email' ? 'Email' : null}
                {this.props.item === 'address' ? 'Address' : null}
                {this.props.item === 'telephone_no' ? 'Telephone No' : null}
                {this.props.item === 'image' ? 'Photo' : null}
            </td>
            <td>
                {this.props.address_element[this.props.item] ?
                    <form className="ui form" onSubmit={this.update( this.props.item )}>
                        <input type="text" value={this.state.inputValue} onChange={this.get_value} />
                        <input type="submit" value="Update" className="ui positive icon button" />
                    </form> :
                    this.props.item !== 'image' ?
                        <span> {this.props.element}
                            <span className="edit" onClick={ () => { this.props.makeInputBox(this.props.item) } }>Edit</span>
                        </span> :
                        <span>
                            { this.props.image_element(this.props.element)}
                        </span>
                }
            </td>
        </tr>
        );
	}
}

const mapStateToProps = state => ({
    userID: state.authReducer.result._id,
    page: state.addressReducer.address.page,
});

export default connect(mapStateToProps)(EditableRow);