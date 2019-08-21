import React, { Component } from 'react';
import { AsyncStorage, StatusBar, TouchableOpacity, TextInput, Image, Platform, FlatList, Alert } from 'react-native';
import { Container, Header, Content, Icon, Text, Picker, View, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import debounce from 'lodash/debounce'
import DateTimePicker from "react-native-modal-datetime-picker";
import { Images } from '../Themes/'
import LoadingOverlay from '../Components/LoadingOverlay';
import ErrorPage from '../Components/NetworkErrorScreen';
import FeedbackActions from '../Redux/FeedbackRedux';
import Styles from './Styles/FeedbackScreenStyle'


const ImagePickerOptions = {
  title: 'Select Photos For Feedback',
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
    this.renderRow = this.renderRow.bind(this);
    this.renderDocumentItem = this.renderDocumentItem.bind(this);
    this.searchPlant = debounce((text) => this.props.getPlantsForSearchParam(text), 250);
  }

  componentDidMount() {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getDepartmentsStatus(accessToken);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createFeedbackResponse && nextProps.createFeedbackResponse.id) {
      this.setState({
        formObj: {},
        errorsObj: {},
        documents: [],
        photos: [],
      });
      this.goToPage();
    }
  }

  handleDocumentRemove(idx) {
    const documents = this.state.documents.filter((s, sidx) => idx !== sidx);
    this.setState({ documents });
  }

  handlePhotoRemove(idx) {
    const photos = this.state.photos.filter((s, sidx) => idx !== sidx);
    this.setState({ photos });
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
            documents: documents.concat([{ label: '', file: res }]),
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
      } else {
        this.setState({
          imageLoading: true,
        });
        this.resize(response);
      }
    });
  }
  resize = (response) => {
    const { photos } = this.state;
    this.setState({
      imageLoading: false,
    });
    ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 100)
      .then(({ uri }) => {
        let source = { uri, path: response.path };
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
    const { formObj, photos, documents } = this.state;
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
      if (documents && documents.length) {
        documents.map(({ file, label}, index) => {
          if (file && file.uri) {
            alert(JSON.stringify(file));
            data.append(`feedback[stored_files_attributes][${index}][document]`, {
              uri: file.uri,
              type: file.type,
              name: file.fileName,
            });
            if(label) {
              data.append(`feedback[stored_files_attributes][${index}][desc]`, label);
            }
          }
          return label;
        });
      }
      AsyncStorage.getItem('accessToken').then((accessToken) => {
        this.props.createFeedback(accessToken, data);
      });
    }
  }

  refreshPage = () => {
    const { fetching } = this.props;
    this.setState({
      formObj: {},
      errorsObj: {},
      documents: [],
      photos: [],
    });
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

  onDocumentChange = (text, index) => {
    const { documents } = this.state;
    const tempData = documents;
    tempData[index].label = text;
    this.setState({
      documents: tempData,
    });
  }

  onPlantSearch = text => {
    if (text && text.length) {
      this.searchPlant(text);
    }
  }


  goToPage = () => {
    const { navigation } = this.props;
    this.props.resetStateOnNavigation();
    navigation.navigate("FeedbackList");
  }

  renderStatusesDropDown = () => {
    const { statuses } = this.props;
    const { OS } = Platform;
    if (OS === 'ios') {
      return statuses.map((value, index) => <Picker.Item key={`status_${value}`} label={value} value={value === 'Select ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ' ? null : value} />)
    } else {
      const tempStatuses = ['Select ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ', ...statuses];
      return tempStatuses.map((status, index) => <Picker.Item key={`status_${index}`} label={status} value={status === 'Select ದೂರು/ಸಲಹೆ/ಬೇಡಿಕೆ' ? null : status} />);
    }
  }

  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.handlePhotoRemove(index)}>
        <View>
          <Image source={item.file} style={Styles.truckImg} />
          <View style={Styles.photoDelete}>
            <Icon name='trash' type="FontAwesome" style={Styles.photoDeleteIcon} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderDocumentItem({ item, index }) {
    return (
      <TouchableOpacity>
        <View style={Styles.fRow}>
          <TextInput
            style={Styles.fInput}
            placeholder='Document Name'
            placeholderTextColor='rgba(36,42,56,0.4)'
            onChangeText={(text) => this.onDocumentChange(text, index)}
          />
          <Icon
            name='delete'
            type="MaterialCommunityIcons"
            style={Styles.fIcon}
            onPress={() => this.handleDocumentRemove(index)}
          />
        </View>
      </TouchableOpacity>

    )
  }

  renderComponent() {
    const { fetching, errorCode } = this.props;
    const { OS } = Platform;
    const { formObj, errorsObj, photos, imageLoading, documents } = this.state;
    if (errorCode) {
      return <ErrorPage status={errorCode} onButtonClick={() => this.refreshPage(1)} />
    }
    return (
      <Content contentContainerStyle={Styles.layoutDefault}>
        <View style={Styles.bgLayout}>
          <View style={Styles.regForm}>
            <View style={Styles.infoBox}>
              <View style={Styles.infoHeader}>
                <Text style={Styles.infoHeaderText}>Details</Text>
              </View>
              <View style={(errorsObj && errorsObj['appointment[event_name]']) ? Styles.fRowError : Styles.fRow}>
                <TextInput
                  style={Styles.fInput}
                  placeholder='Event Name'
                  placeholderTextColor='rgba(36,42,56,0.4)'
                  onChangeText={(text) => this.onFormChange(text, 'appointment[event_name]')}
                  value={formObj['appointment[event_name]']}
                />
                <Icon name='id-card' type="FontAwesome" style={Styles.fIcon} />
              </View>
              <View style={(errorsObj && errorsObj['appointment[org_name]']) ? Styles.fRowError : Styles.fRow}>
                <TextInput
                  style={Styles.fInput}
                  placeholder='Organisation Name'
                  placeholderTextColor='rgba(36,42,56,0.4)'
                  onChangeText={(text) => this.onFormChange(text, 'appointment[org_name]')}
                  value={formObj['appointment[org_name]']}

                />
                <Icon name='comment' type="FontAwesome" style={Styles.fIcon} />
              </View>
              <View style={(errorsObj && errorsObj['appointment[venue]']) ? Styles.fRowError : Styles.fRow}>
                <TextInput
                  style={Styles.fInput}
                  placeholder='Venue'
                  placeholderTextColor='rgba(36,42,56,0.4)'
                  onChangeText={(text) => this.onFormChange(text, 'appointment[venue]')}
                  value={formObj['appointment[venue]']}
                />
                <Icon name='comment' type="FontAwesome" style={Styles.fIcon} />
              </View>
              <View style={(errorsObj && errorsObj['appointment[details]']) ? Styles.fRowError : Styles.fRow}>
                <TextInput
                  style={Styles.fInput}
                  placeholder='Details'
                  placeholderTextColor='rgba(36,42,56,0.4)'
                  onChangeText={(text) => this.onFormChange(text, 'appointment[details]')}
                  value={formObj['appointment[details]']}
                  multiline
                  numberOfLines={10}
                />
                <Icon name='comment' type="FontAwesome" style={Styles.fIcon} />
              </View>
              <View style={Styles.fRow}>
                  <Icon name='calendar-today' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"spinner"}
                    placeHolderText="Request Date"
                    textStyle={Styles.fInput}
                    placeHolderTextStyle={{ color: 'rgba(36,42,56,0.4)' }}
                    onDateChange={(date) => this.onFormChange(date, 'appointment[req_date]')}
                    disabled={fetching}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['appointment[req_date]']}</Text>
                </View>
              <View style={Styles.fRow}>
                  <Icon name='calendar-today' type="MaterialCommunityIcons" style={Styles.fIcon} />
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"spinner"}
                    placeHolderText="Optional Date"
                    textStyle={Styles.fInput}
                    placeHolderTextStyle={{ color: 'rgba(36,42,56,0.4)' }}
                    onDateChange={(date) => this.onFormChange(date, 'appointment[opt_date]')}
                    disabled={fetching}
                  />
                  <Text style={Styles.fErrorLabel}>{errorsObj['appointment[opt_date]']}</Text>
                </View>
                <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
            </View>
          </View>

          <View style={Styles.regForm}>
            <View style={Styles.infoBox}>
              <View style={[Styles.infoHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={[Styles.infoHeaderText, { justifyContent: 'center', alignItems: 'center' }]}>Photos</Text>
                <View style={{ alignSelf: 'flex-end', margin: 0 }}>
                  <TouchableOpacity disabled={imageLoading} style={[Styles.fBtnSmall]} onPress={this.addPhoto}>
                    <Text style={Styles.fBtnText}>Add Photos</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Styles.photos}>
                <FlatList
                  data={photos}
                  numColumns={3}
                  showsHorizontalScrollIndicator={false}
                  renderItem={this.renderRow}
                />
              </View>
            </View>
          </View>
          <View style={Styles.regForm}>
            <View style={Styles.infoBox}>
              <View style={[Styles.infoHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={[Styles.infoHeaderText, { justifyContent: 'center', alignItems: 'center' }]}>Documents</Text>
                <View style={{ alignSelf: 'flex-end', margin: 0 }}>
                  <TouchableOpacity disabled={imageLoading} style={[Styles.fBtnSmall]} onPress={this.addDocument}>
                    <Text style={Styles.fBtnText}>Add Documents</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Styles.photos}>
                <FlatList
                  data={documents}
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubview
                  renderItem={this.renderDocumentItem}
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
    const { imageLoading } = this.state;
    const isLoaderVsible = fetching || imageLoading ? true : false;
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
          visible={isLoaderVsible}
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

