export function separateByUpperCase(word) {
  // Capitalize the first letter
  word = word.charAt(0).toUpperCase() + word.slice(1);

  // Separate the word by the first uppercase letter
  var separated = word.replace(/([a-z])([A-Z])/g, "$1 $2");

  return separated;
}
