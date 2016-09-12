import * as React from 'react';
import Tooltip from 'material-ui/internal/Tooltip';
import transformStyle from '../../../utils/transformStyle';

const tooltipStyle = {
  top: -36,
  left: '50%',
  ...transformStyle('translateX(-50%)')
};

export default class Button extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
    count: React.PropTypes.number,
    tooltip: React.PropTypes.string
  };

  state = { showTooltip: false };

  handleMouseEnter = () => {
    this.setState({ showTooltip: true });
  };

  handleMouseLeave = () => {
    this.setState({ showTooltip: false });
  };

  render() {
    const { onClick, count, children, tooltip } = this.props;
    return (
      <button
        className="ResponseButton"
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="ResponseButton-content">
          <Tooltip
            label={tooltip}
            verticalPosition="top"
            horizontalPosition="center"
            show={this.state.showTooltip}
            style={tooltipStyle}
          />
          <div className="ResponseButton-icon">{children}</div>
          <span className="ResponseButton-count">{count}</span>
        </div>
      </button>
    );
  }
}
