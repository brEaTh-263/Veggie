import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Colors from "../../constants/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([
    //TO BE SET FROM BACK-END ACCORDING TO OFFERS ETC
    {
      imageUrl:
        "https://image.freepik.com/free-vector/fruit-juice-ad-template_52683-4015.jpg",
    },
    {
      imageUrl:
        "https://image.freepik.com/free-vector/corn-flakes-milk-splashes-3d-realistic-set_163454-194.jpg",
    },
    {
      imageUrl:
        "https://image.freepik.com/free-vector/tortilla-chips-food-product-ad_52683-33928.jpg",
    },
    {
      imageUrl:
        "https://image.freepik.com/free-photo/luxury-pears-black-bowl_23-2148594973.jpg",
    },
    {
      imageUrl:
        "https://image.freepik.com/free-photo/scattered-cherries-with-strawberries-green-plums-from-basket_176474-6165.jpg",
    },
  ]);
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
        sliderWidth={400}
        itemWidth={300}
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
