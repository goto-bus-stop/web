import cx from 'classnames';
import React from 'react';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';

import Avatar from '../Avatar';

const fullSizeStyle = {
  width: '100%',
  height: '100%'
};

const UserInfo = ({ className, user, ...attrs }) => {
  return (
    <div
      className={cx('UserInfo', className)}
      {...attrs}
    >
      <Avatar
        className="UserInfo-avatar"
        user={user}
      />
      <div className="UserInfo-settings">
        <SettingsIcon
          color="#fff"
          style={fullSizeStyle}
        />
      </div>
    </div>
  );
};

export default UserInfo;
