import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './Styles/SliderEntryStyle';
import SliderEntry from './sliderEntry';
import styles, { colors } from './Styles/ImageViewerStyle';
// import { ENTRIES1, ENTRIES2 } from 'example/src/static/entries';
import { scrollInterpolators, animatedStyles } from '../Lib/animation';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
export const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg'
    }
];

export const ENTRIES2 = [
    {
        title: 'Favourites landscapes 1',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
    },
    {
        title: 'Favourites landscapes 2',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
    },
    {
        title: 'Favourites landscapes 3',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
    },
    {
        title: 'Favourites landscapes 4',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/cA8zoGel.jpg'
    },
    {
        title: 'Favourites landscapes 5',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/pewusMzl.jpg'
    },
    {
        title: 'Favourites landscapes 6',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/l49aYS3l.jpg'
    }
];

export default class example extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} />;
    }

    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;
        const { data } = this.props;
        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>Images</Text>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={data}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={data.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    // momentumExample (number, title) {
    //     return (
    //         <View style={styles.exampleContainer}>
    //             <Text style={styles.title}>{`Example ${number}`}</Text>
    //             <Text style={styles.subtitle}>{title}</Text>
    //             <Carousel
    //               data={ENTRIES2}
    //               renderItem={this._renderItem}
    //               sliderWidth={sliderWidth}
    //               itemWidth={itemWidth}
    //               inactiveSlideScale={0.95}
    //               inactiveSlideOpacity={1}
    //               enableMomentum={true}
    //               activeSlideAlignment={'start'}
    //               containerCustomStyle={styles.slider}
    //               contentContainerCustomStyle={styles.sliderContentContainer}
    //               activeAnimationType={'spring'}
    //               activeAnimationOptions={{
    //                   friction: 4,
    //                   tension: 40
    //               }}
    //             />
    //         </View>
    //     );
    // }

    // layoutExample (number, title, type) {
    //     const isTinder = type === 'tinder';
    //     return (
    //         <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
    //             <Text style={[styles.title, isTinder ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
    //             <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>{title}</Text>
    //             <Carousel
    //               data={isTinder ? ENTRIES2 : ENTRIES1}
    //               renderItem={isTinder ? this._renderLightItem : this._renderItem}
    //               sliderWidth={sliderWidth}
    //               itemWidth={itemWidth}
    //               containerCustomStyle={styles.slider}
    //               contentContainerCustomStyle={styles.sliderContentContainer}
    //               layout={type}
    //               loop={true}
    //             />
    //         </View>
    //     );
    // }

    // customExample (number, title, refNumber, renderItemFunc) {
    //     const isEven = refNumber % 2 === 0;

    //     // Do not render examples on Android; because of the zIndex bug, they won't work as is
    //     return !IS_ANDROID ? (
    //         <View style={[styles.exampleContainer, isEven ? styles.exampleContainerDark : styles.exampleContainerLight]}>
    //             <Text style={[styles.title, isEven ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
    //             <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>{title}</Text>
    //             <Carousel
    //               data={this.props.data}
    //               renderItem={renderItemFunc}
    //               sliderWidth={sliderWidth}
    //               itemWidth={itemWidth}
    //               containerCustomStyle={styles.slider}
    //               contentContainerCustomStyle={styles.sliderContentContainer}
    //               scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
    //               slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
    //               useScrollView={true}
    //             />
    //         </View>
    //     ) : false;
    // }


    render () {
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        // const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
        // const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
        // const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
        // const example5 = this.customExample(5, 'Custom animation 1', 1, this._renderItem);
        // const example6 = this.customExample(6, 'Custom animation 2', 2, this._renderLightItem);
        // const example7 = this.customExample(7, 'Custom animation 3', 3, this._renderDarkItem);
        // const example8 = this.customExample(8, 'Custom animation 4', 4, this._renderLightItem);
        const { data } = this.props;
        return (
            <SafeAreaView style={styles.safeArea}>
              {data && data.length ? example1 : null}
            </SafeAreaView>
        );
    }
}