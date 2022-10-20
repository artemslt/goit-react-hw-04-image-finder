import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalContant } from './Modal.styled';

export class Modal extends Component {
  state = {
    modalUrl: '',
  };
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    contentId: PropTypes.number.isRequired,
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  componentDidMount() {
    const { contentId, list } = this.props;
    const element = list.find(({ id }) => id === contentId);
    this.setState({ modalUrl: element.largeImageURL });
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { onClick } = this.props;
    return (
      <Overlay onClick={onClick}>
        <ModalContant>
          <img src={this.state.modalUrl} alt="" />
        </ModalContant>
      </Overlay>
    );
  }
}
