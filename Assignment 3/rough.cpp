// // #include <iostream>

// // using namespace std;


// // int countOccurrences(const int* arr, int size, int targetValue, int currentIndex) {
// //     if (currentIndex >= size) {
// //         return 0;
// //     }

// //     int currentElement = arr[currentIndex];

// //     if (currentElement == targetValue) {
// //         return 1 + countOccurrences(arr, size, targetValue, currentIndex + 1);
// //     } else {
// //         return countOccurrences(arr, size, targetValue, currentIndex + 1);
// //     }
// // }


// // void findAndDisplayOccurrences(const int* arr, int size) {
    
// //     int maxValue = INT_MIN;

// //     for (int i = 0; i < size; i++) {
// //         if (arr[i] > maxValue) {
// //             maxValue = arr[i];
// //         }
// //     }

    
// //     for (int currentValue = maxValue; currentValue >= 1; currentValue--) {
// //         int count = countOccurrences(arr, size, currentValue, 0);
        
// //         if (count > 0) {
// //             cout << "Value: " << currentValue << "    Occurrences: " << count << endl;
// //         }
// //     }
// // }

// // int main() {
// //     int size;
// //     cout << "Enter the number of elements in the array: ";
// //     cin >> size;

// //     int* arr = new int[size];

// //     cout << "Enter elements in the array: ";
// //     for (int i = 0; i < size; i++) {
// //         cin >> arr[i];
// //     }

// //     cout << "Value         Occurrences" << endl;

// //     findAndDisplayOccurrences(arr, size);

// //     delete[] arr;
// //     return 0;
// // }
// #include <iostream>

// bool oddFivesInOctal(int n) {
//     // Base case: If n is 0, there are no more digits to check.
//     if (n == 0) {
//         return false;
//     }

//     // Recursive case: Check the last digit of the octal representation.
//     int lastDigit = n % 8;

//     // Check if the last digit is 5 and if it is, increment a counter.
//     int counter = (lastDigit == 5) ? 1 : 0;

//     // Recursively check the remaining digits by dividing by 8.
//     //return oddFivesInOctal(n / 8) || (counter == 1);
//     return oddFivesInOctal(n / 8) ^ (counter == 1);
// }

// int main() {
//     int n;

//     // Test cases
//     std::cout << "oddFivesInOctal(45): " << (oddFivesInOctal(45) ? "true" : "false") << std::endl;
//     std::cout << "oddFivesInOctal(46): " << (oddFivesInOctal(46) ? "true" : "false") << std::endl;
//     std::cout << "oddFivesInOctal(2605): " << (oddFivesInOctal(2605) ? "true" : "false") << std::endl;

//     return 0;
// }
#include <iostream>

bool oddFivesInOctal(int n) {
    // Base case: If n is 0, there are no more digits to check.
    if (n == 0) {
        return false;
    }

    // Recursive case: Check the last digit of the octal representation.
    int lastDigit = n % 8;

    // Check if the last digit is 5 and if it is, increment a counter.
    int counter = (lastDigit == 5);

    // Recursively check the remaining digits by dividing by 8.
    return oddFivesInOctal(n / 8) ^ (counter == 1);
}

int main() {
    int n;

    // Test cases
    std::cout << "oddFivesInOctal(45): " << (oddFivesInOctal(45) ? "true" : "false") << std::endl;
    std::cout << "oddFivesInOctal(46): " << (oddFivesInOctal(46) ? "true" : "false") << std::endl;
    std::cout << "oddFivesInOctal(2605): " << (oddFivesInOctal(2605) ? "true" : "false") << std::endl;

    return 0;
}
