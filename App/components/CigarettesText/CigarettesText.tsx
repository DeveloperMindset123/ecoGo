import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ViewProps } from "react-native";

import type { Frequency } from "@shootismoke/ui";
import * as theme from "../../util/theme";
import { swearWords } from "./swearWords";
import { t } from "../../localization";

export interface CigaretteTextProps extends ViewProps {
  cigarettes: number;
  /**
   * If set, will show the frequency in the text.
   */
  frequency?: Frequency;
  loading?: boolean;
}

const styles = StyleSheet.create({
  cigarettesCount: {
    color: theme.colors.orange,
  },
});

/**
 * Return a random swear word, untranslated.
 *
 * @param cigaretteCount - The cigarette count for which we show the swear
 * word.
 */
export function getSwearWord(cigaretteCount: number): string {
  if (cigaretteCount <= 1) return "home_cigarettes_oh";

  // Return a random swear word, untranslated.
  return swearWords[Math.floor(Math.random() * swearWords.length)];
}

export function CigarettesText(props: CigaretteTextProps): React.ReactElement {
  const { cigarettes, frequency, loading, style, ...rest } = props;

  // Decide on a swear word. The effect says that the swear word only changes
  // when the cigarettes count changes.
  const [swearWord, setSwearWord] = useState(getSwearWord(cigarettes));
  useEffect(() => {
    setSwearWord(getSwearWord(cigarettes));
  }, [cigarettes, t]);

  if (loading) {
    // FIXME i18n
    return (
      <Text style={[theme.shitText]}>
        Loading<Text style={styles.cigarettesCount}>...{"\n"}</Text>
      </Text>
    );
  }

  // Round to 1 decimal
  const cigarettesRounded = Math.round(cigarettes * 10) / 10;

  return (
    <Text style={[theme.shitText, style]} {...rest}>
      {t("home_cigarettes_swear_smoke", {
        swearWord: "Sh*t",
        youSmoke: t("home_cigarettes_you_smoke"),
      })}
      <Text style={styles.cigarettesCount}>
        {t("home_cigarettes_count", {
          count: cigarettesRounded,
          singularPlural:
            cigarettesRounded === 1
              ? t("home_cigarettes_cigarette")
              : t("home_cigarettes_cigarettes"),
        })}
      </Text>
      {frequency}
    </Text>
  );
}
