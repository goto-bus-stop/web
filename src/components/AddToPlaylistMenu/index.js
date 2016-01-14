import find from 'array-find';
import React, { Component, PropTypes } from 'react';
import ActiveIcon from 'material-ui/lib/svg-icons/navigation/check';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RenderToLayer from 'material-ui/lib/render-to-layer';

const MENU_HEIGHT = 320;
const MENU_WIDTH = 280;

const RANDOM_MUI_PADDING = 8;
const SCROLLBAR_WIDTH = 7;

const positionInsideWindow = (position, expectedHeight) => {
  const constrained = { x: position.x, y: position.y };
  const h = Math.min(expectedHeight, MENU_HEIGHT);
  const w = MENU_WIDTH;
  if (position.y + h >= window.innerHeight) {
    // position at the bottom of the screen
    constrained.y = window.innerHeight - h;
  }
  if (position.x + w >= window.innerWidth) {
    // position to the left-hand side of the anchor, instead of the right-hand side
    constrained.x -= w;
  }
  return constrained;
};

export default class AddToPlaylistMenu extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object),
    media: PropTypes.arrayOf(PropTypes.object),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  };

  onSelect(e, item) {
    const playlistID = item.props.value;
    this.props.onClose();
    this.props.onSelect(
      find(this.props.playlists, pl => pl._id === playlistID),
      this.props.media
    );
  }

  renderLayer() {
    const { playlists, position } = this.props;
    const fixedPosition = positionInsideWindow(position, playlists.length * 48);
    return (
      <div style={{
        position: 'absolute',
        left: fixedPosition.x,
        top: fixedPosition.y,
        width: MENU_WIDTH + RANDOM_MUI_PADDING + SCROLLBAR_WIDTH
      }}>
        <Menu
          style={{ textAlign: 'left', zIndex: 30 }}
          maxHeight={MENU_HEIGHT}
          width={MENU_WIDTH}
          autoWidth={false}
          onItemTouchTap={::this.onSelect}
        >
          {playlists.map(playlist => (
            <MenuItem
              key={playlist._id}
              value={playlist._id}
              primaryText={playlist.name}
              secondaryText={`${playlist.size || 0}`}
              leftIcon={playlist.active ? <ActiveIcon style={{ width: 48, height: 48 }} /> : null}
            />
          ))}
        </Menu>
      </div>
    );
  }

  render() {
    const { onClose } = this.props;
    return (
      <RenderToLayer
        open
        componentClickAway={onClose}
        render={::this.renderLayer}
      />
    );
  }
}