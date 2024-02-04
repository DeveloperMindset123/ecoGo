import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import enUS from './languages/en-us';
import en from './languages/en.json';

i18n.fallbacks = true;
i18n.translations = {
	en,
	'en-US': enUS,
};

// If the locale is en-US, then we use the `en-US` file. For any other locale,
// we use the `en` file
i18n.locale =
	Localization.locale && Localization.locale.toLowerCase() === 'en-us'
		? 'en-US'
		: 'en';

const { t } = i18n;

export { i18n, t };
