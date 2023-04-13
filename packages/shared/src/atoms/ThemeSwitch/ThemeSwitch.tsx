import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import {
  TrackingActions,
  TrackingCategories,
} from '../../../../dapp/src/const';
import {
  EventTrackingTools,
  useUserTracking,
} from '../../../../dapp/src/hooks';
import { useDetectDarkModePreference } from '../../../../dapp/src/providers/ThemeProvider';
import { useSettings } from '../../hooks';
import { ButtonThemeSwitch } from './ThemeSwitch.style';
export const ThemeSwitch = () => {
  const isDarkMode = useDetectDarkModePreference();
  const settings = useSettings();
  const { t: translate } = useTranslation();
  const i18Path = 'navbar.';
  const { trackEvent } = useUserTracking();

  const handleThemeSwitch = () => {
    trackEvent({
      category: TrackingCategories.THEME_SWITCH,
      action: TrackingActions.CLICK_THEME_SWITCH,
      label: `themeSwitch-${isDarkMode ? 'light' : 'dark'}`,
      data: { themeSwitch: `theme-${isDarkMode ? 'light' : 'dark'}` },
      disableTrackingTool: [EventTrackingTools.arcx],
    });
    settings.onChangeMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <Tooltip
      title={
        settings.themeMode === 'light'
          ? translate(`${i18Path}themes.light`)
          : settings.themeMode === 'dark'
          ? translate(`${i18Path}themes.dark`)
          : translate(`${i18Path}themes.auto`)
      }
    >
      <ButtonThemeSwitch
        onClick={() => {
          handleThemeSwitch();
        }}
      >
        {settings.themeMode === 'light' ? (
          <LightModeIcon />
        ) : settings.themeMode === 'dark' ? (
          <NightlightIcon />
        ) : (
          <BrightnessAutoIcon />
        )}
      </ButtonThemeSwitch>
    </Tooltip>
  );
};
