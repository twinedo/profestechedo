// Functions
// - generate random color (_generateRandomColor)
// - get initial letter from words (_getInitials)

export const _generateRandomColor = () => {
  const softRed = Math.floor(Math.random() * 128) + 128;
  const softGreen = Math.floor(Math.random() * 128) + 128;
  const softBlue = Math.floor(Math.random() * 128) + 128;

  const color = `rgb(${softRed}, ${softGreen}, ${softBlue})`;

  return color;
};

export function _getInitials(str: string) {
  // Split the string into words
  const words = str.split(' ');

  // Extract the first letter from each word
  const initials = words.map(word => word.charAt(0));

  // Concatenate the initials and limit to 2 characters
  const result = initials.join('').slice(0, 2);

  return result.toUpperCase(); // Optional: Convert to uppercase
}
