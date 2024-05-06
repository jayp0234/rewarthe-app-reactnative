import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

export default class Carousel extends Component {

    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.entries}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
        );
    }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})









// import {
// 	FlatList,
// 	Image,
// 	StyleSheet,
// 	Text,
// 	View,
// 	Dimensions,
// 	LogBox,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";

// const Carousel = () => {
// 	const flatlistRef = useRef();
// 	// Get Dimesnions
// 	const screenWidth = Dimensions.get("window").width;
// 	const [activeIndex, setActiveIndex] = useState(0);

// 	// Auto Scroll

// 	useEffect(() => {
// 		let interval = setInterval(() => {
// 			if (activeIndex === carouselData.length - 1) {
// 				flatlistRef.current.scrollToIndex({
// 					index: 0,
// 					animation: true,
// 				});
// 			} else {
// 				flatlistRef.current.scrollToIndex({
// 					index: activeIndex + 1,
// 					animation: true,
// 				});
// 			}
// 		}, 2000);

// 		return () => clearInterval(interval);
// 	});

// 	const getItemLayout = (data, index) => ({
// 		length: 200,
// 		offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
// 		index: index,
// 	});
// 	// Data for carousel
// 	const carouselData = [
// 		{
// 			id: "01",
// 			image: require("../assets/images/slider_1.jpg"),
// 		},
// 		{
// 			id: "02",
// 			image: require("../assets/images/slider_2.jpg"),
// 		},
// 		{
// 			id: "03",
// 			image: require("../assets/images/slider_3.jpg"),
// 		},
// 	];

// 	//  Display Images // UI
// 	const renderItem = ({ item, index }) => {
// 		return (
// 			<View>
// 				<Image
// 					source={item.image}
// 					style={{ height: 200, width: screenWidth, borderRadius:40}}
// 				/>
// 			</View>
// 		);
// 	};

// 	// Handle Scroll
// 	const handleScroll = (event) => {
// 		// Get the scroll position
// 		const scrollPosition = event.nativeEvent.contentOffset.x;
// 		console.log({ scrollPosition });
// 		// Get the index of current active item

// 		const index = scrollPosition / screenWidth;

// 		console.log({ index });
// 		// Update the index

// 		setActiveIndex(index);
// 	};

// 	// Render Dot Indicators
// 	const renderDotIndicators = () => {
// 		return carouselData.map((dot, index) => {
// 			// if the active index === index

// 			if (activeIndex === index) {
// 				return (
// 					<View
// 						style={{
// 							backgroundColor: "black",
// 							height: 10,
// 							width: 10,
// 							borderRadius: 5,
// 							marginHorizontal: 6,
// 						}}
// 					></View>
// 				);
// 			} else {
// 				return (
// 					<View
// 						key={index}
// 						style={{
// 							backgroundColor: "#FC6736",
// 							height: 10,
// 							width: 10,
// 							borderRadius: 5,
// 							marginHorizontal: 6,
// 						}}
// 					></View>
// 				);
// 			}
// 		});
// 	};

// 	return (
// 		<View>
// 			<FlatList
// 				data={carouselData}
// 				ref={flatlistRef}
// 				getItemLayout={getItemLayout}
// 				renderItem={renderItem}
// 				keyExtractor={(item) => item.id}
// 				horizontal={true}
// 				pagingEnabled={true}
// 				onScroll={handleScroll}
// 			/>

// 			<View
// 				style={{
// 					flexDirection: "row",
// 					justifyContent: "center",
// 					marginTop: 10,
                    
// 				}}
// 			>
// 				{renderDotIndicators()}
// 			</View>
// 		</View>
// 	);
// };

// export default Carousel;

// const styles = StyleSheet.create({});