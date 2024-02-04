import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

import { t } from "../../localization";
import * as theme from "../../util/theme";
import { CircleButton } from "../CircleButton";

type ChangeLocationProps = TouchableOpacityProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    paddingTop: scale(2), // Empirically looks most centered
    marginBottom: theme.spacing.tiny,
    backgroundColor: "tomato",
  },
  label: {
    color: "tomato",
    fontFamily: theme.Montserrat800,
    fontSize: scale(8),
    letterSpacing: 0,
    lineHeight: scale(10),
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export function ChangeLocation(props: ChangeLocationProps): React.ReactElement {
  const { style, ...rest } = props;
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <CircleButton
        as={View}
        icon="location-sharp"
        inverted
        style={styles.icon}
      />
      <Text style={styles.label}>{t("home_header_change_location")}</Text>
    </TouchableOpacity>
  );
}
