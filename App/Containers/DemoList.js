import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Card, Appbar, Button, TouchableRipple, Badge, } from 'react-native-paper';
// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/DemoListStyle'
import { debug } from 'util';

class DemoList extends React.PureComponent {

  constructor(props) {
    super(props);
    // this.goToBeneficiaryDetailView = this.goToBeneficiaryDetailView.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {
        title: 'CM Medical Relief (Govt. Scheme)',
        citizen: 'ಶ್ರೀಮತಿ. ಮಾದೇವಿ ರಾಮ ಮೊಗೇರ : 1',
        place: "ಹೆರ್ತಾರ - HERTAR",
        applicationDate: "2019-04-12",
        grantedRelief: "ರೂ.10757.00 ಚೆಕ್ ನಂಬರ: 715367 ದಿನಾಂಕ: 11/02/2019",
        status: "ಮಂಜೂರಾಗಿರುತ್ತದೆ. - Sanctioned.",
      },
      {
        title: 'CM Medical Relief (Govt. Scheme)',
        citizen: 'ಶ್ರೀಮತಿ. ಮಾದೇವಿ ರಾಮ ಮೊಗೇರ : 1',
        place: "ಹೆರ್ತಾರ - HERTAR",
        applicationDate: "2019-04-12",
        grantedRelief: "ರೂ.10757.00 ಚೆಕ್ ನಂಬರ: 715367 ದಿನಾಂಕ: 11/02/2019",
        status: "ಮಂಜೂರಾಗಿರುತ್ತದೆ. - Sanctioned.",
      },
      {
        title: 'CM Medical Relief (Govt. Scheme)',
        citizen: 'ಶ್ರೀಮತಿ. ಮಾದೇವಿ ರಾಮ ಮೊಗೇರ : 1',
        place: "ಹೆರ್ತಾರ - HERTAR",
        applicationDate: "2019-04-12",
        grantedRelief: "ರೂ.10757.00 ಚೆಕ್ ನಂಬರ: 715367 ದಿನಾಂಕ: 11/02/2019",
        status: "ಮಂಜೂರಾಗಿರುತ್ತದೆ. - Sanctioned.",
      },
      // {title: 'Second Title', description: 'Second Description'},
      // {title: 'Third Title', description: 'Third Description'},
      // {title: 'Fourth Title', description: 'Fourth Description'},
      // {title: 'Fifth Title', description: 'Fifth Description'},
      // {title: 'Sixth Title', description: 'Sixth Description'},
      // {title: 'Seventh Title', description: 'Seventh Description'}
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  goToBeneficiaryDetailView(index) {
    console.log(index);
  }
  renderRow({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.goToBeneficiaryDetailView(item)}>
        <Card elevation={3} style={styles.row}>
          <Badge style={styles.badgeStyle}>{index + 1}</Badge>
          <Card.Content>
            <Text style={styles.cardLabel}>Scheme</Text>
            <Text style={styles.cardText}>{item.title}</Text>
            <Text style={styles.cardLabel}>Beneficiary</Text>
            <Text style={styles.cardText}>{item.citizen}</Text>
            <Text style={styles.cardLabel}>place</Text>
            <Text style={styles.cardText}>{item.place}</Text>
            <Text style={styles.cardLabel}>Application Date</Text>
            <Text style={styles.cardText}>{item.applicationDate}</Text>
            <Text style={styles.cardLabel}>Granted Relief</Text>
            <Text style={styles.cardText}>{item.grantedRelief}</Text>
            <Text style={styles.cardLabel}>Status</Text>
            <Text style={styles.cardText}>{item.status}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header -  </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}


export default DemoList


// ItemSeparatorComponent={this.renderSeparator}