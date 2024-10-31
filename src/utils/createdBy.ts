export const createdBy = () => {
  const asciiSign = '<!-- Created by Roelu - www.roelu.com -->';
  document.head.insertAdjacentHTML('beforebegin', asciiSign);
};
