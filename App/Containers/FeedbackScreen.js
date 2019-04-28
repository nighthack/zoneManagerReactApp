import React, { Component } from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image } from 'react-native'
import { Container, Header, Content, Icon, Text, Picker, View, Textarea } from 'native-base'
import { connect } from 'react-redux'
import { Images } from '../Themes/'
import LoadingOverlay from '../Components/LoadingOverlay';
import SearchableDropdown from 'react-native-searchable-dropdown';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import FeedbackActions from '../Redux/FeedbackRedux'

// Styles
import Styles from './Styles/FeedbackScreenStyle'

class FeedbackScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formObj: {},
      errorsObj: {},
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.createFeedbackResponse) {
      this.setState({
        formObj: {},
       errorsObj: {},
      });
    }
  }

  validateForm = () => {
    const { formObj } = this.state;
    const errorsObj = {};
    let errors = 0;
    const requiredFields = ['feedback[name]', 'feedback[details]', 'feedback[feedback_type]', 'feedback[place_id]', 'feedback[department_id]'];
    requiredFields.map((key) => {
      if (formObj[key]) {
        errorsObj[key] = null;
      } else {
        errors += 1;
        errorsObj[key] = `Please Fill ${key.replace("feedback[", "").slice(0, -1)}`;
      }
      return key;
    });
    this.setState({
      errorsObj,
    });
    if (errors) {
      return false;
    }
    return true;
  }
  onFormSubmit = () => {
    const isFormValid = this.validateForm();
    const { formObj } = this.state;
    if (isFormValid) {
      const { user } = this.props;
      let data = new FormData();
      for (let property in formObj) {
        if (property === 'feedback[place_id]') {
          data.append(property, formObj[property].id);
        } else {
          data.append(property, formObj[property]);
        }
      }
      this.props.createFeedback(user.access_token, data);
    }
  }
  componentDidMount() {
    const { user } = this.props;
    this.props.getDepartmentsStatus(user.access_token);
  }

  onFormChange = (value, key) => {
    const { formObj } = this.state;
    this.setState({
      formObj: { ...formObj, [key]: value }
    });
  }
  onPlantSearch = text => {
    const { user } = this.props;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.props.getPlantsForSearchParam(user.access_token, text);
    }, 100);
  }
  goToPage = () => {
    const { navigation } = this.props;
    this.props.resetStateOnNavigation();
    this.setState({
      formObj: {},
      errorsObj: {},
    });
    navigation.navigate("FeedbackList");
  }
  render() {
    const { fetching, departments, statuses, plantsList } = this.props;
    const { formObj, errorsObj } = this.state;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={this.goToPage}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle} />
            <View style={Styles.navRight} />
          </View>
        </Header>

        <Content contentContainerStyle={Styles.layoutDefault}>

          <Image source={Images.background} style={Styles.bgImg} />
          <View style={Styles.bgLayout}>
            <View style={Styles.hTop}>
              <Icon name='feedback' type="MaterialIcons" style={Styles.hImg} />
              <View style={Styles.hContent}>
                <Text style={Styles.hTopText}>Feedback</Text>
                <Text style={Styles.hTopDesc}>Your Feedback is very important for us</Text>
              </View>
            </View>
            <View style={Styles.regForm}>
              <View style={Styles.infoBox}>
                <View style={Styles.infoHeader}>
                  <Text style={Styles.infoHeaderText}>Feedback Details</Text>
                </View>
                <View style={Styles.fRow}>
                  <TextInput
                    style={Styles.fInput}
                    placeholder='Title/ವಿಷಯ'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    onChangeText={(text) => this.onFormChange(text, 'feedback[name]')}
                  />
                </View>
                <View><Text style={Styles.fErrorLabel}>{errorsObj['feedback[name]']}</Text></View>
                <View style={Styles.fDropdown}>
                  <SearchableDropdown
                    onTextChange={(text) => this.onPlantSearch(text)}
                    onItemSelect={item => this.onFormChange(item, 'feedback[place_id]')}
                    textInputStyle={Styles.fSearchInput}
                    containerStyle={Styles.fPicker}
                    itemStyle={Styles.pickerItem}
                    itemTextStyle={Styles.fSearchInput}
                    items={plantsList}
                    defaultIndex={0}
                    placeholder="Select Place/ಸ್ಥಳ ಆರಿಸಿ"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                  />

                </View>
                <View><Text style={Styles.fErrorLabel}>{errorsObj['feedback[place_id]']}</Text></View>
                <View style={Styles.fSelect}>
                  <View style={Styles.fPicker}>
                    <Picker
                      style={Styles.fPickerItem}
                      textStyle={Styles.fInput}
                      placeholder="Select Department/ಇಲಾಖೆ ಆರಿಸಿ"
                      placeholderStyle={Styles.placeholderStyle}
                      selectedValue={formObj['feedback[department_id]']}
                      iosIcon={<Icon name='chevron-down' type="MaterialCommunityIcons" style={Styles.fIcon} />}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onFormChange(itemValue, 'feedback[department_id]')
                      }
                    >
                      {
                        departments.map(({ id, name }) => <Picker.Item key={`${name}_${id}`} label={name} value={id} />
                        )
                      }
                    </Picker>
                  </View>

                </View>
                <View><Text style={Styles.fErrorLabel}>{errorsObj['feedback[department_id]']}</Text></View>
                <View style={Styles.fSelect}>
                  <View style={Styles.fPicker}>
                    <Picker
                      style={Styles.fPickerItem}
                      textStyle={Styles.fInput}
                      placeholder="Select type/ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ"
                      placeholderStyle={Styles.placeholderStyle}
                      selectedValue={formObj['feedback[feedback_type]']}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onFormChange(itemValue, 'feedback[feedback_type]')
                      }
                      iosIcon={<Icon name='chevron-down' type="MaterialCommunityIcons" style={Styles.fIcon} />}
                    >
                      {
                        statuses.map((status) =>
                          <Picker.Item key={`${status}`} label={status} value={status} />
                        )}
                    </Picker>

                  </View>
                </View>
                <View><Text style={Styles.fErrorLabel}>{errorsObj['feedback[feedback_type]']}</Text></View>

                <View style={Styles.fRow}>
                  <Textarea
                    style={Styles.fInput}
                    placeholder='Details/ವಿವರ'
                    placeholderTextColor='rgba(36,42,56,0.4)'
                    multiline={true}
                    numberOfLines={10}
                    iosIcon={<Icon name='chevron-down' type="MaterialCommunityIcons" style={Styles.fIcon} />}
                    onChangeText={(text) => this.onFormChange(text, 'feedback[details]')}
                  />

                </View>
                <View><Text style={Styles.fErrorLabel}>{errorsObj['feedback[details]']}</Text></View>
              </View>
            </View>
            <TouchableOpacity style={Styles.fBtn} onPress={this.onFormSubmit}>
              <Text style={Styles.fBtnText}>Save</Text>
              <Icon name='check' type="FontAwesome" style={Styles.fBtnIcon} />
            </TouchableOpacity>
          </View>
        </Content>
        <LoadingOverlay
          visible={fetching}
        >
          <View>
            <Image source={Images.bjpGif} />
          </View>
        </LoadingOverlay>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    plantsList: state.feedback.plantsList,
    departments: state.feedback.departments,
    statuses: state.feedback.statuses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlantsForSearchParam: (accessToken, searchParam) =>
      dispatch(FeedbackActions.getPlacesList(accessToken, searchParam)),
    getDepartmentsStatus: (accessToken) =>
      dispatch(FeedbackActions.getDepartmentsList(accessToken)),
    createFeedback: (accessToken, data) =>
      dispatch(FeedbackActions.createFeedback(accessToken, data)),
    resetStateOnNavigation: () =>
      dispatch(FeedbackActions.resetStateOnNavigation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen)

                // <View style={Styles.fDropdown}>
                //   <SearchableDropdown
                //     onTextChange={(text) => this.onPlantSearch(text)}
                //     onItemSelect={item => this.onFormChange(item, 'feedback[feedback_type]')}
                //     textInputStyle={Styles.fSearchInput}
                //     containerStyle={Styles.fPicker}
                //     itemStyle={Styles.pickerItem}
                //     itemTextStyle={Styles.fSearchInput}
                //     items={statuses}
                //     defaultIndex={0}
                //     placeholder="Select Place"
                //     resetValue={false}
                //     underlineColorAndroid="transparent"
                //   />
                //   <Icon
                //     name='message-text-outline'
                //     type="MaterialCommunityIcons"
                //     style={Styles.fDropdownIcon}
                //   />
                // </View>
