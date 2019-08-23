import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, TouchableOpacity, FlatList } from 'react-native'
import { Container, Content } from 'native-base'
import DevelopmentWorksActions from "../Redux/DevelopmentWorkRedux";
import { format } from 'date-fns';
import { CustomActivityIndicator } from '../Components/ui';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
import { NavigationEvents } from 'react-navigation';
import Styles from './Styles/BenefeciaryDetailViewStyle';
import ListCardComponent from '../Components/ListCardComponent';
import EmptyListComponent from '../Components/EmptyList';


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

class BeneficiaryList extends Component {
  static navigationOptions = {
    title: 'ಅಭಿವೃಧ್ಧಿ ಕಾಮಗಾರಿ',
    headerBackTitle: null,
  }

  componentDidMount() {
    this.goToPage('first');
  }

  goToPage = (option) => {
    const { lastCalledPage } = this.props;
    if (option === 'next') {
      this.onTableFetchRequest(lastCalledPage + 1);
    } else if (option === 'prev') {
      this.onTableFetchRequest(lastCalledPage - 1 >= 0 ? lastCalledPage - 1 : 1);
    } else if (option === 'first') {
      this.onTableFetchRequest(1);
    } else if (option === 'refresh') {
      this.onTableFetchRequest(lastCalledPage);
    }
  }

  onTableFetchRequest = (pageID) => {
    const { fetching } = this.props;
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (!fetching) {
        this.props.getListData(accessToken, pageID);
      }
    });
  }

  goToDetailView(selectedData) {
    const { navigate } = this.props.navigation;
    navigate('DevelopmentWorkDetail', { selectedData });
  }

  formatData(data) {
    return(
      {
        title: data.name,
        image: data.image,
        subTitle: data.department,
        desc: data.desc,
        createdDate: data.created_at ? format(new Date(data.created_at), 'DD-MM-YYYY') : 'NA',
        lastUpdatedAt: data.updated_at ? format(new Date(data.updated_at), 'DD-MM-YYYY') : 'NA',
        metaData: [ 
          {title: 'ಸ್ಥಳ', description: data.place},
          {title: 'ಮಂಜೂರಾದ ಮೊತ್ತ', description: data.sanctioned_amount, hasIcon: true, iconName: 'cash-multiple', isCash: true, },
          {title: 'ಹಾಲಿ ಸ್ಥಿತಿ', description: data.status},
          {title: 'ಅಡಿಗಲ್ಲು ದಿನಾಂಕ', description: data.foundation_date, iconName: 'calendar', hasIcon: true},
          {title: 'ಉದ್ಘಾಟನೆ ದಿನಾಂಕ', description: data.inaugration_date, iconName: 'calendar', hasIcon: true},
          {title: 'ಷರಾ', description: data.remarks},
        ]
      }
    )
  }

  renderContent = () => {
    const { listError, data } = this.props;
    if (listError) {
      return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
    }
    return (
      <Content>
        <FlatList
          contentContainerStyle={Styles.listContent}
          keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.goToDetailView(item)}>
              <ListCardComponent
                {...this.formatData(item)}
              />
            </TouchableOpacity>
          )}
          removeClippedSubview
          ListEmptyComponent={()=> <EmptyListComponent onButtonClick={() => this.onTableFetchRequest(1)} />}
          
        />
      </Content>
    )
  }

  render() {
    const { fetching, lastCalledPage, data } = this.props;
    return (
      <Container>
        <NavigationEvents
          onDidFocus={() => this.goToPage('first')}
        />

        {this.renderContent()}
        {
          fetching ? <CustomActivityIndicator /> : null
        }
        <FooterComponent
          goToFirstPage={() => this.goToPage('first')}
          goToNextPage={() => this.goToPage('next')}
          goToPrevPage={() => this.goToPage('prev')}
          refreshPage={() => this.goToPage('refresh')}
          data={data}
          currentPage={lastCalledPage}
        />
      </Container>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    // data: state.beneficiary.listData,
    // fetching: state.beneficiary.fetching,
    // lastCalledPage: state.beneficiary.lastCalledPage,
    // currentPage: state.beneficiary.pageNo,
    // listError: state.beneficiary.listError,
    data: state.development.listData,
    fetching: state.development.fetching,
    lastCalledPage: state.development.lastCalledPage,
    listError: state.development.listError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListData: (accessToken, pageNo, lastCalledPage) =>
      dispatch(DevelopmentWorksActions.devWorkOnListRequest(accessToken, pageNo, lastCalledPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryList)