import React, { useState } from "react";
import { View, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const CustomCarousel = () => {
  const carouselItems = useSelector((state) => state.Products.carouselItems);
  const [activeIndex, setActiveIndex] = useState(0);
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 30,
          height: 200,
          overflow: "hidden",
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: item.imageUrl }}
          style={{ height: 200, width: "100%", overflow: "hidden" }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
        height: 230,
      }}
    >
      <Carousel
        layout={"stack"}
        layoutCardOffset={8}
        ref={(ref) => (carousel = ref)}
        data={carouselItems}
        sliderWidth={450}
        itemWidth={350}
        autoplay={true}
        loop={true}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          width: "100%",
          position: "absolute",
          bottom: -20,
        }}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 3.5,
          marginHorizontal: 3,
          backgroundColor: Colors.primary,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CustomCarousel;
