import { MESSAGE } from './messages/error-messages';

export const setRequiredText = (document: string) => {
  return MESSAGE.ERROR.REQUIRE.replace('{document}', document);
};

export const setRequiredCol = (document: string) => {
  return MESSAGE.ERROR.INCORRECT_TEMPLATE.replace('{document}', document);
};

export const setRequiredCell = (document: string) => {
  return MESSAGE.ERROR.CELL_EMPTY.replace('{document}', document);
};

export const trimAndToLowerCase = (text: string) => {
  return text.trim().toLowerCase();
};

export const compareTwoString = (firstStr: string, secondStr: string) => {
  return trimAndToLowerCase(firstStr) === trimAndToLowerCase(secondStr);
};
