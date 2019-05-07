import React, { Component } from 'react';
import { AsyncStorage, StatusBar, TouchableOpacity, TextInput, Image, Platform, FlatList, Alert } from 'react-native';
import { Container, Header, Content, Icon, Text, Picker, View, Textarea } from 'native-base';
import { connect } from 'react-redux';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { Images } from '../Themes/'
import LoadingOverlay from '../Components/LoadingOverlay';
import ErrorPage from '../Components/NetworkErrorScreen';
import SearchableDropdown from 'react-native-searchable-dropdown';
import FeedbackActions from '../Redux/FeedbackRedux';
import Styles from './Styles/FeedbackScreenStyle'


const ImagePickerOptions = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class FeedbackScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formObj: {},
      errorsObj: {},
      documents: [],
      photos: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createFeedbackResponse && nextProps.createFeedbackResponse.id) {
      this.setState({
        formObj: {},
        errorsObj: {},
      });
      nextProps.navigation.navigate('FeedbackList');
    }
  }

  handleDocumentRemove(e, idx) {
    e.preventDefault();
    const documents = this.state.documents.filter((s, sidx) => idx !== sidx);
    this.setState({ documents });
  }

  addDocument = () => {
    const { documents } = this.state;
    DocumentPicker.show({
        filetype: [DocumentPickerUtil.allFiles()],
        //All type of Files DocumentPickerUtil.allFiles()
        //Only PDF DocumentPickerUtil.pdf()
        //Audio DocumentPickerUtil.audio()
        //Plain Text DocumentPickerUtil.plainText()
      },
      (error, res) => {
        if (res.uri) {
          this.setState({
            documents: documents.concat([{ label: res.fileName, file: res.uri }]),
          });
        }
      }
    );
  };

  addPhoto = () => {
    const { photos } = this.state;
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.resize(response);
      }
    });
  }
  resize = (response) => {
    const { photos } = this.state;
    ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 100)
    .then(({uri}) => {
      let source = { uri, path: response.path };
      console.log(uri);
      this.setState({
        photos: photos.concat([{ label: response.fileName, file: source }]),
      });
    }).catch((err) => {
      console.log(err);
      return Alert.alert('Unable to resize the photo',
        'Check the console for full the error message');
    });
  }
  validateForm = () => {
    const { formObj } = this.state;
    const errorsObj = {};
    let errors = 0;
    // 'feedback[department_id]'
    const requiredFields = ['feedback[name]', 'feedback[details]', 'feedback[feedback_type]', 'feedback[place_id]'];
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
    const { formObj, photos } = this.state;
    if (isFormValid) {
      let data = new FormData();
      for (let property in formObj) {
        if (property === 'feedback[place_id]') {
          data.append(property, formObj[property].id);
        } else {
          data.append(property, formObj[property]);
        }
      }
      if (photos && photos.length) {
        photos.map((photoItem, index) => {
          if (photoItem.file) {
            data.append(`feedback[stored_images_attributes][${index}][image]`, {
              uri: photoItem.file.uri,
              type: 'image/jpeg',
              name: 'image.jpg',
            });
          }
          return photoItem;
        });
      }
      AsyncStorage.getItem('accessToken').then((accessToken) => {
        this.props.createFeedback(accessToken, data);
      });
    }
  }
  componentDidMount() {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getDepartmentsStatus(accessToken);
      }
    });
  }
  refreshPage = () => {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getDepartmentsStatus(accessToken);
      }
    });
  }

  onFormChange = (value, key) => {
    const { formObj } = this.state;
    this.setState({
      formObj: { ...formObj, [key]: value }
    });
  }
  onPlantSearch = text => {
    this.props.getPlantsForSearchParam(text);
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

  renderStatusesDropDown = () => {
    const { statuses } = this.props;
    const { OS } = Platform;
    if (OS === 'ios') {
      return statuses.map((value, index) => <Picker.Item key={`status_${value}`} label={value} value={value === 'Select type/ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ' ? null : value} />)
    } else {
      const tempStatuses = ['Select type/ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ', ...statuses];
      return tempStatuses.map((status, index) => <Picker.Item key={`status_${index}`} label={status} value={status === 'Select type/ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ' ? null : status} />);
    }
  }

  renderDepartmentsDropdown = () => {
    const { departments } = this.props;
    const { OS } = Platform;
    if (OS === 'ios') {
      return departments.map(({ id, name }, index) => <Picker.Item key={`status_${index}`} label={name} value={id} />)
    } else {
      const tempDepartments = [{ index: null, name: 'Department/ಇಲಾಖೆ ಆರಿಸಿ' }, ...departments]
      return tempDepartments.map(({ id, name }, index) => <Picker.Item key={`status_${index}`} label={name} value={id} />);
    }

  }

  renderComponent() {
    const { plantsList, errorCode } = this.props;
    const { OS } = Platform;
    const { formObj, errorsObj, photos } = this.state;
    if (errorCode) {
      return <ErrorPage status={errorCode} onButtonClick={() => this.refreshPage(1)} />
    }
    return (
      <Content contentContainerStyle={Styles.layoutDefault}>
        <Image source={Images.background} style={Styles.bgImg} />
        <View style={Styles.bgLayout}>
          <View style={Styles.hTop}>
            <Icon name='comment' type="FontAwesome" style={Styles.hImg} />
            <View style={Styles.hContent}>
              <Text style={Styles.hTopText}>Create Feedback</Text>
              <Text style={Styles.hTopDesc}>Create Feedbacks and suggestions</Text>
            </View>
          </View>
          <View style={Styles.regForm}>
            <View style={Styles.infoBox}>
              <View style={Styles.infoHeader}>
                <Text style={Styles.infoHeaderText}>Details</Text>
              </View>
              <View style={(errorsObj && errorsObj['feedback[name]']) ? Styles.fRowError : Styles.fRow}>
                <TextInput
                  style={Styles.fInput}
                  placeholder='Title/ವಿಷಯ'
                  placeholderTextColor='rgba(36,42,56,0.4)'
                  onChangeText={(text) => this.onFormChange(text, 'feedback[name]')}
                />
                <Icon name='id-card' type="FontAwesome" style={Styles.fIcon} />
              </View>
              <View style={(errorsObj && errorsObj['feedback[place_id]']) ? Styles.fSelectError : Styles.fSelect}>
                <SearchableDropdown
                  onTextChange={(text) => this.onPlantSearch(text)}
                  onItemSelect={item => this.onFormChange(item, 'feedback[place_id]')}
                  textInputStyle={(errorsObj && errorsObj['feedback[place_id]']) ? Styles.fSearchInputError : Styles.fSearchInput}
                  containerStyle={Styles.fPicker}
                  itemStyle={Styles.pickerItem}
                  itemTextStyle={Styles.fSearchInput}
                  items={plantsList}
                  defaultIndex={0}
                  placeholder="Select Place"
                  resetValue
                  underlineColorAndroid="transparent"
                />
                <Icon name='google-maps' type="MaterialCommunityIcons" style={Styles.fIcon} />
              </View>
              <View style={(errorsObj && errorsObj['feedback[feedback_type]']) ? Styles.fSelectError : Styles.fSelect}>
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
                  >
                    {this.renderStatusesDropDown()}
                  </Picker>
                </View>
                {
                  OS === 'ios' ? <Icon name='arrow-down' type="FontAwesome" style={Styles.fIcon} /> : null
                }
              </View>
              <View style={(errorsObj && errorsObj['feedback[department_id]']) ? Styles.fSelectError : Styles.fSelect}>
                <View style={Styles.fPicker}>
                  <Picker
                    style={Styles.fPickerItem}
                    textStyle={Styles.fInput}
                    placeholder="Department/ಇಲಾಖೆ ಆರಿಸಿ"
                    placeholderStyle={Styles.placeholderStyle}
                    selectedValue={formObj['feedback[department_id]']}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onFormChange(itemValue, 'feedback[department_id]')
                    }
                  >
                    {this.renderDepartmentsDropdown()}
                  </Picker>
                </View>
                {
                  OS === 'ios' ? <Icon name='building-o' type="FontAwesome" style={Styles.fIcon} /> : null
                }
              </View>
              <View style={(errorsObj && errorsObj['feedback[details]']) ? Styles.fRowError : Styles.fRow}>
                <TextInput
                  style={Styles.fInput}
                  placeholder='Details/ವಿವರ'
                  placeholderTextColor='rgba(36,42,56,0.4)'
                  onChangeText={(text) => this.onFormChange(text, 'feedback[details]')}
                  numberOfLines={10}
                  multiline
                />
                <Icon name='comment' type="FontAwesome" style={Styles.fIcon} />
              </View>
            </View>
          </View>
          <View style={Styles.regForm}>
            <View style={Styles.infoBox}>
              <View style={[Styles.infoHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={[Styles.infoHeaderText, { justifyContent: 'center', alignItems: 'center'}]}>Photos</Text>
                <View style={{ alignSelf: 'flex-end', margin: 0 }}>
                  <TouchableOpacity style={[Styles.fBtnSmall]} onPress={this.addPhoto}>
                    <Text style={Styles.fBtnText}>Add Photos</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Styles.photos}>
                <FlatList
                  data={photos}
                  numColumns={3}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, separators }) => (
                  <View>
                      <Image source={item.file} style={Styles.truckImg} />
                      <View style={Styles.photoDelete}>
                          <Icon name='trash' type="FontAwesome" style={Styles.photoDeleteIcon} />
                      </View>
                  </View>
                  )}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={Styles.fBtn} onPress={this.onFormSubmit}>
            <Text style={Styles.fBtnText}>Submit</Text>
            <Icon name='check' type="FontAwesome" style={Styles.fBtnIcon} />
          </TouchableOpacity>
        </View>
      </Content>
    )
  }

  render() {
    const { fetching, navigation } = this.props;
    return (
      <Container>
        <Header style={Styles.navigation}>
          <StatusBar backgroundColor="#242A38" animated barStyle="light-content" />
          <View style={Styles.nav}>
            <View style={Styles.navLeft}>
              <TouchableOpacity style={Styles.navLeft} onPress={() => {
                navigation.navigate("FeedbackList")
              }}>
                <Icon name='arrow-back' type="MaterialIcons" style={Styles.navIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.navMiddle} />
            <View style={Styles.navRight} />
          </View>
        </Header>
        {this.renderComponent()}
        <LoadingOverlay
          visible={fetching}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
        />
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    plantsList: state.feedback.plantsList,
    departments: state.feedback.departments,
    statuses: state.feedback.statuses,
    error: state.feedback.formError,
    errorCode: state.feedback.createFeedbackErrorCode,
    createFeedbackResponse: state.feedback.createFeedbackResponse,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlantsForSearchParam: (searchParam) =>
      dispatch(FeedbackActions.getPlacesList(searchParam)),
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

//   <Icon
//     name='message-text-outline'
//     type="MaterialCommunityIcons"
//     style={Styles.fDropdownIcon}
//   />
// </View>

//     <View style={Styles.regForm}>
//   <View style={Styles.infoBox}>
//     <View style={Styles.infoHeader}>
//       <Text style={Styles.infoHeaderText}>Documents</Text>
//     </View>
//     <View style={Styles.fRow}>
//       <TextInput style={Styles.fInput} placeholder='RC Book' placeholderTextColor='rgba(36,42,56,0.4)' />
//       <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//     </View>
//     <View style={Styles.fRow}>
//       <TextInput style={Styles.fInput} placeholder='Insurance Document' placeholderTextColor='rgba(36,42,56,0.4)' />
//       <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//     </View>
//     <View style={Styles.fRow}>
//       <TextInput style={Styles.fInput} placeholder='Pollution Document' placeholderTextColor='rgba(36,42,56,0.4)' />
//       <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//     </View>
//   </View>
// </View>

// <View style={Styles.regForm}>
//   <View style={Styles.infoBox}>
//     <View style={Styles.infoHeader}>
//       <Text style={Styles.infoHeaderText}>Documents</Text>
//     </View>
//     <View style={Styles.fRow}>
//       <TextInput style={Styles.fInput} placeholder='RC Book' placeholderTextColor='rgba(36,42,56,0.4)' />
//       <Icon name='file-document' type="MaterialCommunityIcons" style={Styles.fIcon} />
//     </View>                                                      
// </View>
// </View>
