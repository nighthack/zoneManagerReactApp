import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, TouchableOpacity, FlatList  } from 'react-native'
import { Container,  Content, View } from 'native-base'
import { format } from 'date-fns';
import { CustomActivityIndicator } from '../Components/ui';
import FooterComponent from '../Components/ListFooter';
import ErrorPage from '../Components/NetworkErrorScreen';
import FeedbackActions from '../Redux/FeedbackRedux';
import Styles from './Styles/BenefeciaryDetailViewStyle';
import { NavigationEvents } from 'react-navigation';
import ListCardComponent from '../Components/ListCardComponent';

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
class FeedbackList extends Component {
	static navigationOptions = {
    title: 'ದೂರು/ಬೇಡಿಕೆ/ಸಲಹೆ',
  }
	onTableFetchRequest = (pageNo) => {
		AsyncStorage.getItem('accessToken').then((accessToken) => {
			this.props.getFeedbackList(accessToken, pageNo);
		});
	}

	componentDidMount() {
    this.goToPage('first');
  }

	goToPage = (option) => {
		const { currentPage } = this.props;
		if (option === 'next') {
			this.onTableFetchRequest(currentPage + 1);
		} else if (option === 'prev') {
			this.onTableFetchRequest(currentPage - 1 >= 0 ? currentPage - 1 : 1);
		} else if (option === 'first') {
			this.onTableFetchRequest(1);
		} else if (option === 'refresh') {
			this.onTableFetchRequest(currentPage);
		}
	}

	goToDetailView(selectedData) {
		const { navigate } = this.props.navigation;
		navigate("FeedbackDetailScreen", { selectedData });
	}
	formatData(data) {
    return(
      {
        title: data.name,
        image: data.image,
        subTitle: data.feedback_type,
        createdDate: data.created_at ? format(new Date(data.created_at), 'DD-MM-YYYY') : 'NA',
        lastUpdatedAt: data.updated_at ? format(new Date(data.updated_at), 'DD-MM-YYYY') : 'NA',
        metaData: [ 
          {title: 'ಸ್ಥಳ', description: data.place},
          {title: 'ಹಾಲಿ ಸ್ಥಿತಿ', description: data.status},
          {title: 'ಷರಾ', description: data.remarks},
        ]
      }
    )
	}

	renderContent = () => {
		const { listError, currentPage, data, fetching, navigation } = this.props;
		if (listError) {
			return <ErrorPage status={listError} onButtonClick={() => this.onTableFetchRequest(1)} />
		}
		return (
			<View style={{ flex: 1 }}>
				<Content
					contentContainerStyle={[Styles.layoutDefault, { flex: 1 }]}
				>
					<View style={Styles.bgLayout}>
						<FlatList
							style={{ marginBottom: 80 }}
							data={data}
							refreshing={fetching}
							showsHorizontalScrollIndicator={false}
							removeClippedSubview
							keyExtractor={() => randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}
							onEndReached={this.getMoreItems}

							renderItem={({ item, separators }) => (
								<TouchableOpacity onPress={() => this.goToDetailView(item)}>
                  <ListCardComponent
                    {...this.formatData(item)}
                  />
                </TouchableOpacity>

							)}
						/>
					</View>
				</Content>
				<FooterComponent
					goToFirstPage={() => this.goToPage('first')}
					goToNextPage={() => this.goToPage('next')}
					goToPrevPage={() => this.goToPage('prev')}
					refreshPage={() => this.goToPage('refresh')}
					data={data}
					currentPage={currentPage}
				/>
			</View>

		)
	}

	render() {
		const { fetching } = this.props;
		return (
			<Container>
				<NavigationEvents
					onDidFocus={() => this.goToPage('first')}
				/>
				{this.renderContent()}
				{
          fetching ? <CustomActivityIndicator /> : null
        }
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.feedback.listData,
		fetching: state.feedback.fetching,
		currentPage: state.feedback.lastCalledPage,
		listError: state.feedback.listError,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getFeedbackList: (accessToken, pageNo) =>
			dispatch(FeedbackActions.feedbackOnListRequest(accessToken, pageNo))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackList)