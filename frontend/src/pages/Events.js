// No hooks yet...
import React, { Component } from 'react'

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import "./Events.css";

class EventsPage extends Component {
    state = {
        creating: false
    };

    startCreateEventHandler = () => {
        this.setState({ creating: true });
    };

    modalConfirmHandler = () => {
        this.setState({ creating: false });
    };

    modalCancelHandler = () => {
        this.setState({ creating: false });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.creating && (
                    <React.Fragment>
                        <Backdrop />
                        <Modal
                            title="Add Event"
                            canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmHandler}
                        >
                            <p>Modal Content here!</p>
                        </Modal>
                    </React.Fragment>
                )}
                <div className="events-control">
                    <p>Share your own Events!</p>
                    <button className="btn" onClick={this.startCreateEventHandler}>
                        Create Event
                        </button>
                </div>
            </React.Fragment>
        );
    }
}

export default EventsPage