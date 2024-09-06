import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Props {
  images: string[];
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const viewWidth = windowWidth * 0.9;
  const viewHeight = viewWidth * 0.5;

  const renderItem = ({ item }: { item: string }) => (
    <View style={[styles.slide, { height: viewHeight }]}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={viewWidth}
        loop
        autoplay
        autoplayInterval={3000}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.inactiveDot}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  inactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default ImageSlider;
