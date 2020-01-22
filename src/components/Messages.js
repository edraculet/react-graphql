import React, {Component} from 'react';
import {connect} from 'react-redux';

class Messages extends Component {
    render() {
        return (
            <div className="message">
                <div className={this.props.message.type || ''}>{this.props.message.text || ''}</div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    message: state.message
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);
