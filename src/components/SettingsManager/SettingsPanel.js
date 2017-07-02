import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';
import LicenseIcon from 'material-ui/svg-icons/action/copyright';
import GithubIcon from './GithubIcon';
import Profile from './Profile';
import LabeledControl from './LabeledControl';
import LanguagePicker from './LanguagePicker';
import LogoutButton from './LogoutButton';
import NotificationSettings from './NotificationSettings';
import Toggle from './Toggle';

const linkStyle = {
  display: 'block',
  height: 24,
  lineHeight: '24px',
  marginBottom: 20,
  textAlign: 'left',
  WebkitAppearance: 'initial'
};
const iconStyle = { verticalAlign: 'top' };

const linkProps = {
  style: linkStyle,
  target: '_blank',
  labelPosition: 'after',
  backgroundColor: 'transparent',
  hoverColor: 'transparent'
};

class SettingsPanel extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object,
    onSettingChange: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onChangeLanguage: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  handleVideoEnabledChange = (e, value) => {
    this.props.onSettingChange('videoEnabled', value);
  };

  handleVideoSizeChange = (e, value) => {
    this.props.onSettingChange('videoSize', value ? 'large' : 'small');
  };

  handleMentionSoundChange = (e, value) => {
    this.props.onSettingChange('mentionSound', value);
  };

  handleLanguageChange = (e, index, value) => {
    this.props.onChangeLanguage(value);
  };

  render() {
    const {
      t,
      className,
      settings,
      user,
      onChangeUsername,
      onLogout
    } = this.props;

    const profile = user && [
      <Profile
        key="profile"
        user={user}
        onChangeUsername={onChangeUsername}
      />,
      <hr key="divider" className="SettingsPanel-divider" />
    ];

    return (
      <div className={cx('SettingsPanel', className)}>
        {profile}
        <div className="SettingsPanel-column SettingsPanel-column--left">
          <h2 className="SettingsPanel-header">{t('settings.title')}</h2>
          <Toggle
            label={t('settings.videoEnabled')}
            toggled={settings.videoEnabled}
            onToggle={this.handleVideoEnabledChange}
          />
          <Toggle
            label={t('settings.videoSize')}
            toggled={settings.videoSize === 'large'}
            onToggle={this.handleVideoSizeChange}
          />
          <Toggle
            label={t('settings.mentionSound')}
            toggled={settings.mentionSound}
            onToggle={this.handleMentionSoundChange}
          />
          <div className="SettingsPanel-toggle">
            <LabeledControl id="uw-setting-language" label={t('settings.language')}>
              <LanguagePicker
                id="uw-setting-language"
                value={settings.language}
                onChange={this.handleLanguageChange}
              />
            </LabeledControl>
          </div>
          <LogoutButton onLogout={onLogout} />
        </div>
        <div className="SettingsPanel-column SettingsPanel-column--right">
          <NotificationSettings
            settings={settings}
            onSettingChange={this.props.onSettingChange}
          />
          <h2 className="SettingsPanel-header">{t('settings.links.title')}</h2>
          <FlatButton
            href="https://github.com/u-wave"
            label={t('settings.links.website')}
            {...linkProps}
          >
            <GithubIcon style={iconStyle} />
          </FlatButton>
          <FlatButton
            href="https://github.com/u-wave/web"
            label={t('settings.links.source')}
            {...linkProps}
          >
            <GithubIcon style={iconStyle} />
          </FlatButton>
          <FlatButton
            href="https://github.com/u-wave/web/tree/master/LICENSE"
            label={t('settings.links.license')}
            {...linkProps}
          >
            <LicenseIcon style={iconStyle} />
          </FlatButton>
        </div>
      </div>
    );
  }
}

export default translate()(SettingsPanel);
