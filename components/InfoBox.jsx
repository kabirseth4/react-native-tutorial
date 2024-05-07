import { View, Text } from "react-native";

export const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-center font-psemibold text-white ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-pregular text-center text-sm text-gray-100">
        {subtitle}
      </Text>
    </View>
  );
};
