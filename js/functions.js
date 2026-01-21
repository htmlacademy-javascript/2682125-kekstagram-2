// Function to check string length
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Usage examples:
checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

// Function to check if a string is a palindrome
const isPalindrome = (string) => {
  // Normalize the string: remove spaces and convert to lowercase
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  // Create a variable for the reversed string
  let reversedString = '';

  // Reverse the string
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  // Compare normalized and reversed strings
  return normalizedString === reversedString;
};

// Usage examples:
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

const isMeetingWithinWorkday = (workdayStart, workdayEnd, meetingStart, meetingDuration) => {
  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workdayStartMinutes = timeToMinutes(workdayStart);
  const workdayEndMinutes = timeToMinutes(workdayEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workdayStartMinutes && meetingEndMinutes <= workdayEndMinutes;
};

isMeetingWithinWorkday('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkday('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkday('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkday('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkday('8:00', '17:30', '08:00', 900);
