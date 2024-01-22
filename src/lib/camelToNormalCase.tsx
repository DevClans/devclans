export default function camelToNormalCase(camelCaseString: string): string {
  const result = camelCaseString
    .replace(/([A-Z])/g, " $1") // add a space before each uppercase letter
    .toLowerCase() // convert all letters to lowercase
    .replace(/(^| )(\w)/g, (s) => s.toUpperCase()); // convert the first letter of each word to uppercase

  return result;
}
