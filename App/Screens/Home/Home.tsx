import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import { Frequency, FrequencyContext } from "@shootismoke/ui";
import { scale } from "react-native-size-matters";

import { Button, CigarettesBlock } from "../../components";
import { ApiContext, CurrentLocationContext } from "../../stores";
import * as theme from "../../util/theme";
import { RootStackParams } from "../routeParams";
import { AdditionalInfo } from "./AdditionalInfo";
import { Header } from "./Header";
import { SelectFrequency } from "./SelectFrequency";
import { SmokeVideo } from "./SmokeVideo";
import { Details } from "../Details/Details";
import { Pollution } from "../Pollution";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeProps {
  navigation: StackNavigationProp<RootStackParams, "Home">;
}

/**
 * Thresholds on cigarettes count to show different cigarettes sizes.
 */
const THRESHOLD = {
  FIRST: 0.2,
  SECOND: 1,
  THIRD: 4,
  FOURTH: 14,
};

/**
 * Sizes of different cigarettes.
 */
const SIZES = {
  BIG: 180,
  MEDIUM: 90,
  SMALL: 41,
};

/**
 * Depending on cigarettes sizes, get correct margins.
 */
function getCigarettesMargin(count: number): number {
  return scale(
    count <= THRESHOLD.THIRD ? 9 : count <= THRESHOLD.FOURTH ? 6 : 3
  );
}

/*
 * Calculates each cigarettes height using number of cigarettes
 */
function getCigarettesHeight(count: number): number {
  return scale(
    count <= THRESHOLD.FIRST
      ? SIZES.BIG
      : count <= THRESHOLD.SECOND
      ? SIZES.MEDIUM
      : count <= THRESHOLD.THIRD
      ? SIZES.BIG
      : count <= THRESHOLD.FOURTH
      ? SIZES.MEDIUM
      : SIZES.SMALL
  );
}

/*
 * Dynamically calculating max number of cigarettes
 */
function getDynamicMaxCigarettes(count: number): number {
  const CIGARETTE_ASPECT_RATIO = 21 / 280; // taken from the @shootismoke/ui lib
  const height = getCigarettesHeight(count);
  const width = height * CIGARETTE_ASPECT_RATIO;
  const margin = getCigarettesMargin(count);
  const componentWidth =
    Dimensions.get("window").width - theme.withPadding.paddingHorizontal * 2;
  // componentWidth * 2 because we want to show cigarettes in two rows
  const r = Math.floor((componentWidth * 2) / (width + margin));
  return r;
}

const styles = StyleSheet.create({
  cigarettes: {
    height: scale(SIZES.MEDIUM),
  },
  container: {
    flexGrow: 1,
  },
  footer: {
    paddingBottom: theme.spacing.huge,
  },
  scroll: {
    flex: 1,
  },
  withMargin: {
    marginTop: theme.spacing.normal,
  },
});

interface Cigarettes {
  /**
   * The current number of cigarettes shown on this Home screen
   */
  count: number;
  /**
   * Denotes whether the cigarette count is exact or not. It's usually exact.
   * The only case where it's not exact, it's when we fetch weekly/monthly
   * cigarettes count, and the backend doesn't give us data back, then we
   * just multiply the daily count by 7 or 30, and put exact=false.
   */
  exact: boolean;
  /**
   * The frequency on this cigarettes number
   */
  frequency: Frequency;
}

export function Home(props: HomeProps): React.ReactElement {
  const { navigation } = props;

  const { api } = useContext(ApiContext);
  const { currentLocation } = useContext(CurrentLocationContext);
  const { frequency } = useContext(FrequencyContext);

  if (!api) {
    throw new Error("Home/Home.tsx only gets displayed when `api` is defined.");
  } else if (!currentLocation) {
    throw new Error(
      "Home/Home.tsx only gets displayed when `currentLocation` is defined."
    );
  }

  // Decide on how many cigarettes we want to show on the Home screen.
  const [cigarettes, setCigarettes] = useState<Cigarettes>({
    count: api.shootismoke.dailyCigarettes,
    exact: true,
    frequency,
  });
  useEffect(() => {
    setCigarettes({
      count:
        api.shootismoke.dailyCigarettes *
        (frequency === "daily" ? 1 : frequency === "weekly" ? 7 : 30),
      // Since for weeky and monthyl, we just multiply, it's not exact
      exact: frequency === "daily",
      frequency,
    });
  }, [api, frequency]);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, { paddingTop: -20 }]}
    >
      <SmokeVideo cigarettes={cigarettes.count} />
      <Header
        onChangeLocationClick={(): void => {
          navigation.navigate("Search");
        }}
      />
      <View style={styles.withMargin} />
      <Pollution />

      <CigarettesBlock
        cigarettes={cigarettes.count}
        cigarettesStyle={styles.cigarettes}
        fullCigaretteLength={getCigarettesHeight(cigarettes.count)}
        showMaxCigarettes={getDynamicMaxCigarettes(cigarettes.count)}
        spacingHorizontal={getCigarettesMargin(cigarettes.count)}
        spacingVertical={getCigarettesMargin(cigarettes.count)}
        style={[theme.withPadding, styles.withMargin]}
        textStyle={[theme.shitText, styles.withMargin]}
      />
      <View style={{ marginTop: 10 }} />
      {/* <Button
					style={{
						width: '90%',
						backgroundColor: 'orange',
						alignSelf: 'center',
						marginTop: 15,
						position: 'relative',
						zIndex: -1,
						borderColor: 'white',
						height: 55,
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: '17px',
							fontWeight: 'bold',
						}}
					>
						Explore!
					</Text>
				</Button> */}
      {/* <SelectFrequency style={styles.withMargin} /> */}
      {/* <AdditionalInfo
					exactCount={cigarettes.exact}
					frequency={frequency}
					navigation={navigation}
					style={styles.withMargin}
				/> */}
      {/* <Footer
					navigation={navigation}
					style={[styles.withMargin, styles.footer]}
				/> */}
    </SafeAreaView>
  );
}
