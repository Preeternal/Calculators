// @flow
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Animated, PanResponder, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { SwipeRow } from 'react-native-swipe-list-view';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  char: string,
  onDelete: Function,
  onMove: Function,
  onLongPress: Function,
  onPressOut: Function,
  preset: Array<string>,
  presetChanged: Function,
  setScrollEnabled: Function,
  // active: Object,
  isActive: boolean,
};

type State = { position: Animated.ValueXY };

const { width } = Dimensions.get('window');
const gestureDelay = -35;

class CurrencyPreset extends Component<Props, State> {
  scrollViewEnabled: boolean;

  panResponder: Object;

  constructor(props) {
    super(props);

    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          const newX = gestureState.dx + gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: { x: width, y: 0 },
            duration: 300,
          }).start(() => {
            const preset = this.props.preset.filter(i => i !== this.props.char);
            this.onPresetChange(preset);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = { position };
  }

  setScrollViewEnabled = (enabled) => {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  };

  onPresetChange = (array) => {
    this.props.presetChanged(array);
  };

  render() {
    const {
      containerStyle,
      containerStyle2,
      active,
      deleteStyle,
      charStyle,
      charTextStyle,
      moveStyle,
    } = styles;
    return (
      // !this.props.verticalMove ?
      <View style={styles.listItem}>
        {/* <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText}>{strings('converter.DELETE')}</Text>
          </View>
          <View style={[containerStyle, this.props.selectedStyle]}>
            <TouchableOpacity style={deleteStyle} onPress={this.props.onDelete}>
              <Icon type="MaterialIcons" name="delete" style={{ fontSize: 22, color: 'gray' }} />
            </TouchableOpacity>
            <View style={charStyle}>
              <Text style={charTextStyle}>{this.props.char}</Text>
            </View>
            <TouchableOpacity
              style={moveStyle}
              onPress={this.props.onMove}
              onLongPress={this.props.onLongPress}
              onPressOut={this.props.onPressOut}
            >
              <Icon type="FontAwesome" name="sort" style={{ fontSize: 22, color: 'gray' }} />
            </TouchableOpacity>
          </View>
        </Animated.View> */}
        <SwipeRow rightOpenValue={-180}>
          {!this.props.isActive && (
            <View style={styles.absoluteCell}>
              <Text style={styles.absoluteCellText}>{strings('converter.DELETE')}</Text>
            </View>
          )}
          <View style={[containerStyle, this.props.isActive && active]}>
            <TouchableOpacity style={deleteStyle} onPress={this.props.onDelete}>
              <Icon type="MaterialIcons" name="delete" style={{ fontSize: 22, color: 'gray' }} />
            </TouchableOpacity>
            <View style={charStyle}>
              <Text style={charTextStyle}>{this.props.char}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={moveStyle}
              // onPress={this.props.onMove}
              onLongPress={this.props.onLongPress}
              onPressOut={this.props.onPressOut}
            >
              <Icon type="FontAwesome" name="sort" style={{ fontSize: 22, color: 'gray' }} />
            </TouchableOpacity>
          </View>
        </SwipeRow>

        {/* <SwipeRow rightOpenValue={-180}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.root, this.props.isActive && styles.active]}
            onLongPress={this.props.onLongPress}
            onPressOut={this.props.onPressOut}
          >
            <Text style={styles.text}>{this.props.char}</Text>
          </TouchableOpacity>
        </SwipeRow> */}
      </View>
    );
    // ) : (
    //   <View style={[containerStyle2, this.props.selectedStyle]}>
    //     <TouchableOpacity style={deleteStyle} onPress={this.props.onDelete}>
    //       <Icon type="MaterialIcons" name="delete" style={{ fontSize: 22, color: 'gray' }} />
    //     </TouchableOpacity>
    //     <View style={charStyle}>
    //       <Text style={charTextStyle}>{this.props.char}</Text>
    //     </View>
    //     <TouchableOpacity
    //       style={moveStyle}
    //       onPress={this.props.onMove}
    //       onLongPress={this.props.onLongPress}
    //       onPressOut={this.props.onPressOut}
    //     >
    //       <Icon type="FontAwesome" name="sort" style={{ fontSize: 22, color: 'gray' }} />
    //     </TouchableOpacity>
    //   </View>
    // );
  }
}

const styles = {
  listItem: {
    minHeight: 52,
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absoluteCellText: { marginRight: 15, color: '#FFF' },
  containerStyle: {
    width,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    flexDirection: 'row',
    marginLeft: 100,
  },
  containerStyle2: {
    width,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    flexDirection: 'row',
    // marginLeft: 100,
  },
  active: {
    // backgroundColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  deleteStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  charStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  charTextStyle: {
    fontSize: 13,
  },
  moveStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 15,
  },
  root: {
    height: 80,
    backgroundColor: '#031d44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#e57a44',
    fontSize: 32,
  },

  hidden: {
    height: 80,
    backgroundColor: '#d6eadf',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 80,
  },
};

const mapStateToProps = state => ({
  preset: state.converter.preset,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(CurrencyPreset);
