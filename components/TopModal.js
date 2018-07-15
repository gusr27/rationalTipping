import React, {Component} from 'react'
import {Text, TouchableOpacity, StyleSheet,View} from 'react-native'
import Modal from 'react-native-modal'

class TopModal extends Component{
  state={
    visibleModal:null
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
  );
render(){return(
  <Modal
          isVisible={this.state.visibleModal === 4}
          backdropColor={'red'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >)}

}

export default TopModal
