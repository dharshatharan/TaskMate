import React, { Component } from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
// import ModalBaseScene from '@utils/ModalBaseScene';

type State = {
  scrollOffset: undefined | number;
  visible: boolean
};

class BottomModal extends Component<any, State> {
  public scrollViewRef: React.RefObject<ScrollView>;
  constructor(props: any) {
    super(props);
    
    this.state = {
      scrollOffset: undefined,
      visible: true
    }

    this.scrollViewRef = React.createRef();
  }

  open = () => this.setState({visible: true} as any);
  close = () => this.setState({visible: false} as any);
  isVisible = () => this.state.visible;

  handleOnScroll = (event: any) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height,
    });
  };
  handleScrollTo = (p: any) => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

  render(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.isVisible()}
        onSwipeComplete={this.close}
        swipeDirection={['down']}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        // scrollOffsetMax={e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height,} // content height - ScrollView height
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.scrollableModal}>
          <View style={{height: '90%'}}>
            <View style={{backgroundColor: '#FFFFFF', height: 100}}>
              <Text>Test</Text>
            </View>
            <ScrollView
              ref={this.scrollViewRef}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={16}>
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.scrollableModalContent1}>
                  <Text style={styles.scrollableModalText1}>
                    You can scroll me up! 👆
                  </Text>
                </View>
                <View style={styles.scrollableModalContent2}>
                  <Text style={styles.scrollableModalText2}>
                    Same here as well! ☝
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <View style={{backgroundColor: '#FFFFFF'}}>
              <Text>Test</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  scrollableModalContent1: {
    height: 500,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 500,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});

export default BottomModal;