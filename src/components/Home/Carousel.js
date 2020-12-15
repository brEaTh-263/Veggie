import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([
    //TO BE SET FROM BACK-END ACCORDING TO OFFERS ETC
    {
      imageUrl:
        "https://images.unsplash.com/photo-1604654592640-6d4ab7cb3681?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1604609624367-a799bf3d5acd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=689&q=80",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1604543648342-6a500ad7b5c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1604615457628-f7983e74b11b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          height: 200,
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: item.imageUrl }}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    );
  };

  return (
    <Carousel
      layout={"default"}
      ref={(ref) => (carousel = ref)}
      data={carouselItems}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={SCREEN_WIDTH}
      autoplay={true}
      loop={true}
      renderItem={_renderItem}
      onSnapToItem={(index) => setActiveIndex(index)}
    />
  );
};

export default CustomCarousel;
