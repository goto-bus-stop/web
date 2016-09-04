import { userListSelector } from '../selectors/userSelectors';
import * as groupMentions from './groupMentions';

export { groupMentions };

/**
 * Get a list of group names that can be mentioned by a user.
 *
 * @param {{ role: number }} user
 */
export function getAvailableGroupMentions(user) {
  if (user) {
    return Object.keys(groupMentions).filter(
      mention => user.role >= groupMentions[mention].role
    );
  }
  return [];
}

/**
 * Attach user objects to mentions in a parsed chat message.
 *
 * @param {Array} tree Parsed message.
 * @param {Array.<{username: string}>} users List of users.
 */
export function resolveMentions(tree, state) {
  const users = userListSelector(state);
  tree.forEach(node => {
    if (node.type === 'mention') {
      const group = groupMentions[node.mention];
      /* eslint-disable no-param-reassign */
      if (group) {
        node.group = group.users(state);
      } else {
        node.user = users.find(user => user.username.toLowerCase() === node.mention);
      }
      /* eslint-enable no-param-reassign */
    } else if (node.content) {
      resolveMentions(node.content, state);
    }
  });
}

/**
 * Check whether a parsed chat message mentions a given user ID. Expects mention
 * nodes to have User data, added by `resolveMentions()`.
 *
 * @param {Array} tree Parsed message.
 * @param {String} id User ID.
 */
export function hasMention(tree, id) {
  return tree.some(node => {
    if (node.type === 'mention') {
      if (node.user) {
        return node.user._id === id;
      } else if (node.group) {
        return node.group.some(user => user._id === id);
      }
      return false;
    }
    return Array.isArray(node) && hasMention(node, id);
  });
}
