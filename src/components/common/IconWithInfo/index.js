import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

import componentStyle from "../../style";

class IconWithInfo extends Component {
  static propTypes = {
    value: PropTypes.string,
    title: PropTypes.string
  };

  static defaultProps = {
    value: "",
    title: ""
  };
  render = () => {
    const {
      info,
      title,
      displayIcon,
      iconColor,
      size,
      titleColor
    } = this.props;
    return (
      <Card style={[componentStyle.profileMetrics]}>
        <Card.Content
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Icon name={displayIcon} color={iconColor} size={parseInt(size)} />
          <View>
            <Text
              style={{
                color: titleColor,
                alignSelf: "flex-end",
                fontWeight: "500"
              }}
            >
              {title}
            </Text>
            {info}
          </View>
        </Card.Content>
      </Card>
    );
  };
}

export default IconWithInfo;
