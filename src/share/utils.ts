import { MESSAGE } from './messages/error-messages';

export const setRequiredText = (document: string) => {
  return MESSAGE.ERROR.REQUIRE.replace('{document}', document);
};
