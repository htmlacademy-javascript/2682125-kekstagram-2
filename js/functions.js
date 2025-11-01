// Функция для проверки длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Примеры использования:
checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом
const isPalindrome = (string) => {
  // Нормализуем строку: убираем пробелы и приводим к нижнему регистру
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  // Создаём переменную для перевёрнутой строки
  let reversedString;

  // Переворачиваем строку
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  // Сравниваем нормализованную и перевёрнутую строки
  return normalizedString === reversedString;
};

// Примеры использования:
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true
