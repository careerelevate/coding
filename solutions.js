var languageSolutions = {
    python: [
        { walkthrough: "Initialize the minimum to the first list value, scan each value, and update the minimum when a smaller one appears.", code: `values = [9, 3, 4, 2, 7]
minimum = values[0]
for value in values:
    if value < minimum:
        minimum = value
print("Smallest number in an array -", minimum)` },
        { walkthrough: "Compare each position with values to its right and swap out-of-order pairs until the list is sorted.", code: `values = [9, 3, 4, 2, 7]
for i in range(len(values) - 1):
    for j in range(i + 1, len(values)):
        if values[i] > values[j]:
            values[i], values[j] = values[j], values[i]
print(*values)` },
        { walkthrough: "Split at spaces, reverse each word by slicing it backward, then join the words in their original order.", code: `text = "My name is abc"
print(" ".join(word[::-1] for word in text.split(" ")))` },
        { walkthrough: "Scan the digits and count zeros and ones separately; the input is expected to contain only 0 and 1.", code: `value = "101010"
zeros = value.count("0")
ones = value.count("1")
print("zeros", zeros)
print("ones", ones)` },
        { walkthrough: "Try every pair of distinct indexes and return the first pair whose values add to the target.", code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return [-1, -1]

print(two_sum([2, 7, 11, 15], 9))` },
        { walkthrough: "Walk through the sorted list and keep a value only when it differs from the last value already kept.", code: `nums = [1, 2, 2, 2, 3, 5]
unique = []
for value in nums:
    if not unique or unique[-1] != value:
        unique.append(value)
print(unique)` },
        { walkthrough: "Build a list from the input in first-seen order, adding a value only once.", code: `nums = [1, 2, 2, 2, 3, 5]
unique = list(dict.fromkeys(nums))
print(unique)` },
        { walkthrough: "For each value, search the values already collected and append it only if it is new.", code: `nums = [3, 1, 3, 2, 1]
unique = []
for value in nums:
    if value not in unique:
        unique.append(value)
print(unique)` },
        { walkthrough: "Reverse the string by stepping through it from the final character back to the first.", code: `value = "apple"
print(value[::-1])` },
        { walkthrough: "Collect the nonzero values in order, then append enough zeros to restore the original list length.", code: `nums = [0, 1, 0, 3, 12]
result = [value for value in nums if value != 0]
result.extend([0] * (len(nums) - len(result)))
print(result)` },
        { walkthrough: "Compare the string with its reverse; they are equal exactly when the string is a palindrome.", code: `value = "madam"
if value == value[::-1]:
    print(value, "string is palindrome")
else:
    print(value, "string is not palindrome")` },
        { walkthrough: "Reverse the digits with remainder and integer division, then compare the reversed value with the original.", code: `num = 151
original = num
reversed_num = 0
while num > 0:
    reversed_num = reversed_num * 10 + num % 10
    num //= 10
print("It's palindrome" if reversed_num == original else "It's not palindrome")` },
        { walkthrough: "Count equal characters in each adjacent run and move to the first character after that run.", code: `text = "AABBCABCGG"
i = 0
while i < len(text):
    current = text[i]
    count = 0
    while i < len(text) and text[i] == current:
        count += 1
        i += 1
    print(f"{current}:{count}", end=" ")` },
        { walkthrough: "Scan left to right and append a character only if it has not already been kept.", code: `text = "apple"
result = ""
for char in text:
    if char not in result:
        result += char
print(result)` },
        { walkthrough: "Track the largest and second-largest distinct values in one pass, moving the previous largest down when a new maximum appears.", code: `nums = [3, 2, 5, 1, 6]
largest = second = None
for value in nums:
    if largest is None or value > largest:
        second, largest = largest, value
    elif value != largest and (second is None or value > second):
        second = value
print(second if second is not None else "No second-largest distinct value")` },
        { walkthrough: "Take the last digit each time and append it to the reversed number until no digits remain.", code: `num = 456
reversed_num = 0
while num > 0:
    reversed_num = reversed_num * 10 + num % 10
    num //= 10
print(reversed_num)` },
        { walkthrough: "Split into words and increment each word's count in an insertion-ordered dictionary; word matching is case-sensitive.", code: `text = "This this is is done by Saket Saket is Saket"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)` },
        { walkthrough: "Compare each number with its successor; when the gap is greater than one, the missing value is current plus one.", code: `nums = [1, 2, 3, 4, 6, 7, 8]
for current, following in zip(nums, nums[1:]):
    if following - current != 1:
        print(current + 1)
        break` },
        { walkthrough: "Place each character into a new list at its destination index, then join the filled list.", code: `text = "codeleet"
indices = [4, 5, 6, 7, 0, 2, 1, 3]
shuffled = [""] * len(text)
for i, char in enumerate(text):
    shuffled[indices[i]] = char
print("".join(shuffled))` },
        { walkthrough: "Split at spaces and swap the first and last character of each word, leaving single-character words unchanged.", code: `text = "hello world Java"
words = text.split(" ")
for i, word in enumerate(words):
    if len(word) > 1:
        words[i] = word[-1] + word[1:-1] + word[0]
print(" ".join(words))` },
        { walkthrough: "Capitalize a character when it begins the string or follows a space; preserve every other character and space.", code: `text = "java programming is fun"
result = ""
for i, char in enumerate(text):
    if i == 0 or text[i - 1] == " ":
        result += char.upper()
    else:
        result += char
print(result)` }
    ],
    c: [
        { walkthrough: "Initialize the minimum to the first array value, scan the array, and update it whenever a smaller value appears.", code: `#include <stdio.h>
int main(void) {
    int values[] = {9, 3, 4, 2, 7}, n = 5, minimum = 9;
    for (int i = 0; i < n; i++) if (values[i] < minimum) minimum = values[i];
    printf("Smallest number in an array - %d\\n", minimum);
    return 0;
}` },
        { walkthrough: "Compare each position with values to its right and swap out-of-order pairs until the array is sorted.", code: `#include <stdio.h>
int main(void) {
    int values[] = {9, 3, 4, 2, 7}, n = 5;
    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            if (values[i] > values[j]) { int t = values[i]; values[i] = values[j]; values[j] = t; }
    for (int i = 0; i < n; i++) printf("%d ", values[i]);
    return 0;
}` },
        { walkthrough: "Find each word boundary, then print the characters in that word from its end back to its beginning.", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char text[] = "My name is abc";
    char *word = strtok(text, " ");
    while (word) {
        for (int i = (int)strlen(word) - 1; i >= 0; i--) putchar(word[i]);
        putchar(' ');
        word = strtok(NULL, " ");
    }
    return 0;
}` },
        { walkthrough: "Inspect each character and increment the zero or one counter; this input is expected to contain only those digits.", code: `#include <stdio.h>
int main(void) {
    char value[] = "101010";
    int zeros = 0, ones = 0;
    for (int i = 0; value[i]; i++) { if (value[i] == '0') zeros++; else if (value[i] == '1') ones++; }
    printf("zeros %d\\nones %d\\n", zeros, ones);
    return 0;
}` },
        { walkthrough: "Try every pair of distinct indexes and print the first pair whose values add to the target.", code: `#include <stdio.h>
int main(void) {
    int nums[] = {2, 7, 11, 15}, n = 4, target = 9, found = 0;
    for (int i = 0; i < n && !found; i++)
        for (int j = i + 1; j < n; j++)
            if (nums[i] + nums[j] == target) { printf("[%d, %d]\\n", i, j); found = 1; break; }
    if (!found) puts("[-1, -1]");
    return 0;
}` },
        { walkthrough: "Since duplicates in a sorted array are adjacent, copy each new value to the next output position and print the unique prefix.", code: `#include <stdio.h>
int main(void) {
    int nums[] = {1, 2, 2, 2, 3, 5}, n = 6, count = 0;
    for (int i = 0; i < n; i++)
        if (count == 0 || nums[count - 1] != nums[i]) nums[count++] = nums[i];
    printf("[");
    for (int i = 0; i < count; i++) printf("%s%d", i ? ", " : "", nums[i]);
    puts("]");
    return 0;
}` },
        { walkthrough: "Scan the input and append a value only when it is not already among the values collected so far.", code: `#include <stdio.h>
int main(void) {
    int nums[] = {1, 2, 2, 2, 3, 5}, unique[6], count = 0;
    for (int i = 0; i < 6; i++) {
        int seen = 0;
        for (int j = 0; j < count; j++) if (unique[j] == nums[i]) seen = 1;
        if (!seen) unique[count++] = nums[i];
    }
    printf("[");
    for (int i = 0; i < count; i++) printf("%s%d", i ? ", " : "", unique[i]);
    puts("]");
    return 0;
}` },
        { walkthrough: "For each input value, search the collected values and append it only if it has not appeared before.", code: `#include <stdio.h>
int main(void) {
    int nums[] = {3, 1, 3, 2, 1}, unique[5], count = 0;
    for (int i = 0; i < 5; i++) {
        int seen = 0;
        for (int j = 0; j < count; j++) if (unique[j] == nums[i]) seen = 1;
        if (!seen) unique[count++] = nums[i];
    }
    printf("[");
    for (int i = 0; i < count; i++) printf("%s%d", i ? ", " : "", unique[i]);
    puts("]");
    return 0;
}` },
        { walkthrough: "Print the input characters from the final index back to the first.", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char value[] = "apple";
    for (int i = (int)strlen(value) - 1; i >= 0; i--) putchar(value[i]);
    putchar('\\n');
    return 0;
}` },
        { walkthrough: "Copy nonzero values forward without changing their order, then fill the unused positions with zeros.", code: `#include <stdio.h>
int main(void) {
    int nums[] = {0, 1, 0, 3, 12}, n = 5, next = 0;
    for (int i = 0; i < n; i++) if (nums[i] != 0) nums[next++] = nums[i];
    while (next < n) nums[next++] = 0;
    printf("[");
    for (int i = 0; i < n; i++) printf("%s%d", i ? ", " : "", nums[i]);
    puts("]");
    return 0;
}` },
        { walkthrough: "Compare characters from opposite ends, stopping if a pair differs; matching pairs mean the string is a palindrome.", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char value[] = "madam";
    int palindrome = 1, n = (int)strlen(value);
    for (int i = 0; i < n / 2; i++) if (value[i] != value[n - 1 - i]) palindrome = 0;
    puts(palindrome ? "String is palindrome" : "String is not palindrome");
    return 0;
}` },
        { walkthrough: "Take each final digit with modulo, append it to the reversed value, and divide the number by ten before comparing.", code: `#include <stdio.h>
int main(void) {
    int num = 151, original = num, reversed = 0;
    while (num > 0) { reversed = reversed * 10 + num % 10; num /= 10; }
    puts(reversed == original ? "Integer is palindrome" : "Integer is not palindrome");
    return 0;
}` },
        { walkthrough: "Count each consecutive run of the same character, print its length, and continue at the next run.", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char text[] = "AABBCABCGG";
    for (int i = 0, n = (int)strlen(text); i < n;) {
        char current = text[i]; int count = 0;
        while (i < n && text[i] == current) { count++; i++; }
        printf("%c:%d ", current, count);
    }
    return 0;
}` },
        { walkthrough: "Visit characters from left to right and print one only the first time it occurs.", code: `#include <stdio.h>
int main(void) {
    char text[] = "apple";
    for (int i = 0; text[i]; i++) {
        int seen = 0;
        for (int j = 0; j < i; j++) if (text[j] == text[i]) seen = 1;
        if (!seen) putchar(text[i]);
    }
    putchar('\\n');
    return 0;
}` },
        { walkthrough: "Keep the largest and second-largest distinct values while scanning the array once.", code: `#include <stdio.h>
        int main(void) {
            int nums[] = {3, 2, 5, 1, 6}, largest = 0, second = 0;
            int hasLargest = 0, hasSecond = 0;
    for (int i = 0; i < 5; i++) {
                if (!hasLargest || nums[i] > largest) {
                    second = largest; hasSecond = hasLargest; largest = nums[i]; hasLargest = 1;
                } else if (nums[i] != largest && (!hasSecond || nums[i] > second)) {
                    second = nums[i]; hasSecond = 1;
                }
            }
            if (!hasSecond) puts("No second-largest distinct value"); else printf("%d\\n", second);
            return 0;
        }` },
        { walkthrough: "Extract each last digit and append it to the reversed number until the input is exhausted.", code: `#include <stdio.h>
int main(void) {
    int num = 456, reversed = 0;
    while (num > 0) { reversed = reversed * 10 + num % 10; num /= 10; }
    printf("%d\\n", reversed);
    return 0;
}` },
        { walkthrough: "Split the sentence into words and increment the matching word count; comparison remains case-sensitive.", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char text[] = "This this is is done by Saket Saket is Saket", words[20][32];
    int counts[20] = {0}, size = 0;
    for (char *word = strtok(text, " "); word; word = strtok(NULL, " ")) {
        int i = 0;
        while (i < size && strcmp(words[i], word) != 0) i++;
        if (i == size) { strcpy(words[size], word); size++; }
        counts[i]++;
    }
    putchar('{');
    for (int i = 0; i < size; i++) printf("%s%s=%d", i ? ", " : "", words[i], counts[i]);
    puts("}");
    return 0;
}` },
        { walkthrough: "Compare each value to its successor; the first gap larger than one identifies the missing value.", code: `#include <stdio.h>
int main(void) {
    int nums[] = {1, 2, 3, 4, 6, 7, 8};
    for (int i = 0; i < 6; i++)
        if (nums[i + 1] - nums[i] != 1) { printf("%d\\n", nums[i] + 1); break; }
    return 0;
}` },
        { walkthrough: "Put each character into an output array at its destination index and print the completed string.", code: `#include <stdio.h>
int main(void) {
    char text[] = "codeleet", result[9] = {0};
    int indices[] = {4, 5, 6, 7, 0, 2, 1, 3};
    for (int i = 0; text[i]; i++) result[indices[i]] = text[i];
    puts(result);
    return 0;
}` },
        { walkthrough: "Find each word's boundaries, swap its first and last characters in place, and leave spaces untouched.", code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char text[] = "hello world Java";
    for (int start = 0, n = (int)strlen(text); start < n;) {
        int end = start;
        while (end < n && text[end] != ' ') end++;
        if (end - start > 1) { char t = text[start]; text[start] = text[end - 1]; text[end - 1] = t; }
        start = end + 1;
    }
    puts(text);
    return 0;
}` },
        { walkthrough: "Capitalize a character at the start or after a space, leaving all other characters unchanged.", code: `#include <stdio.h>
#include <ctype.h>
int main(void) {
    char text[] = "java programming is fun";
    for (int i = 0; text[i]; i++)
        if (i == 0 || text[i - 1] == ' ') text[i] = (char)toupper((unsigned char)text[i]);
    puts(text);
    return 0;
}` }
    ],
    cpp: [
        { walkthrough: "Initialize the minimum to the first vector value, scan the vector, and update it whenever a smaller value appears.", code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> values{9, 3, 4, 2, 7};
    int minimum = values[0];
    for (int value : values) if (value < minimum) minimum = value;
    cout << "Smallest number in an array - " << minimum << '\\n';
}` },
        { walkthrough: "Compare each position with the values to its right and swap out-of-order pairs until sorted.", code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> values{9, 3, 4, 2, 7};
    for (int i = 0; i < (int)values.size() - 1; i++)
        for (int j = i + 1; j < (int)values.size(); j++)
            if (values[i] > values[j]) swap(values[i], values[j]);
    for (int value : values) cout << value << ' ';
}` },
        { walkthrough: "Split at spaces, reverse each word, and keep the words in their original order.", code: `#include <iostream>
#include <sstream>
#include <algorithm>
using namespace std;
int main() {
    string text = "My name is abc", word;
    istringstream input(text);
    while (input >> word) { reverse(word.begin(), word.end()); cout << word << ' '; }
}` },
        { walkthrough: "Inspect each digit and count zeros and ones separately; the input should contain only those digits.", code: `#include <iostream>
using namespace std;
int main() {
    string value = "101010";
    int zeros = 0, ones = 0;
    for (char digit : value) { if (digit == '0') zeros++; else if (digit == '1') ones++; }
    cout << "zeros " << zeros << "\\nones " << ones << '\\n';
}` },
        { walkthrough: "Try every pair of distinct indexes and print the first pair whose values sum to the target.", code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums{2, 7, 11, 15}; int target = 9; bool found = false;
    for (int i = 0; i < (int)nums.size() && !found; i++)
        for (int j = i + 1; j < (int)nums.size(); j++)
            if (nums[i] + nums[j] == target) { cout << '[' << i << ", " << j << "]\\n"; found = true; break; }
    if (!found) cout << "[-1, -1]\\n";
}` },
        { walkthrough: "Because the array is sorted, keep a value only when it differs from the previous unique value.", code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums{1, 2, 2, 2, 3, 5}, unique;
    for (int value : nums) if (unique.empty() || unique.back() != value) unique.push_back(value);
    cout << '['; for (int i = 0; i < (int)unique.size(); i++) cout << (i ? ", " : "") << unique[i]; cout << "]\\n";
}` },
        { walkthrough: "Scan the input and append a value only once; the vector preserves the order of first appearance.", code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> nums{1, 2, 2, 2, 3, 5}, unique;
    for (int value : nums) if (find(unique.begin(), unique.end(), value) == unique.end()) unique.push_back(value);
    cout << '['; for (int i = 0; i < (int)unique.size(); i++) cout << (i ? ", " : "") << unique[i]; cout << "]\\n";
}` },
        { walkthrough: "Scan the input and append a value only when it is not already in the output vector.", code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums{3, 1, 3, 2, 1}, unique;
    for (int value : nums) {
        bool seen = false; for (int kept : unique) if (kept == value) seen = true;
        if (!seen) unique.push_back(value);
    }
    cout << '['; for (int i = 0; i < (int)unique.size(); i++) cout << (i ? ", " : "") << unique[i]; cout << "]\\n";
}` },
        { walkthrough: "Print the string characters from the final index back to the first.", code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string value = "apple";
    for (int i = (int)value.size() - 1; i >= 0; i--) cout << value[i];
    cout << '\\n';
}` },
        { walkthrough: "Copy all nonzero values forward in order, then fill every remaining position with zero.", code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums{0, 1, 0, 3, 12}; int next = 0;
    for (int value : nums) if (value != 0) nums[next++] = value;
    while (next < (int)nums.size()) nums[next++] = 0;
    cout << '['; for (int i = 0; i < (int)nums.size(); i++) cout << (i ? ", " : "") << nums[i]; cout << "]\\n";
}` },
        { walkthrough: "Compare the string with its reverse; equality means it reads the same in both directions.", code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;
int main() {
    string value = "madam", reversed = value;
    reverse(reversed.begin(), reversed.end());
    cout << (value == reversed ? "String is palindrome\\n" : "String is not palindrome\\n");
}` },
        { walkthrough: "Extract digits from right to left and append them to a reversed number, then compare with the original.", code: `#include <iostream>
using namespace std;
int main() {
    int num = 151, original = num, reversed = 0;
    while (num > 0) { reversed = reversed * 10 + num % 10; num /= 10; }
    cout << (reversed == original ? "Integer is palindrome\\n" : "Integer is not palindrome\\n");
}` },
        { walkthrough: "Count equal adjacent characters as one run, print its length, and continue at the next run.", code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string text = "AABBCABCGG";
    for (int i = 0; i < (int)text.size();) {
        char current = text[i]; int count = 0;
        while (i < (int)text.size() && text[i] == current) { count++; i++; }
        cout << current << ':' << count << ' ';
    }
}` },
        { walkthrough: "Scan from left to right and append a character only the first time it appears.", code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string text = "apple", result;
    for (char value : text) if (result.find(value) == string::npos) result += value;
    cout << result << '\\n';
}` },
        { walkthrough: "Track the largest and second-largest distinct values in a single pass through the vector.", code: `#include <iostream>
#include <vector>
        using namespace std;
        int main() {
            vector<int> nums{3, 2, 5, 1, 6}; int largest = 0, second = 0;
            bool hasLargest = false, hasSecond = false;
    for (int value : nums) {
                if (!hasLargest || value > largest) {
                    second = largest; hasSecond = hasLargest; largest = value; hasLargest = true;
                } else if (value != largest && (!hasSecond || value > second)) {
                    second = value; hasSecond = true;
                }
            }
            if (!hasSecond) cout << "No second-largest distinct value\\n"; else cout << second << '\\n';
        }` },
        { walkthrough: "Repeatedly remove the final digit and append it to the reversed value until no digits remain.", code: `#include <iostream>
using namespace std;
int main() {
    int num = 456, reversed = 0;
    while (num > 0) { reversed = reversed * 10 + num % 10; num /= 10; }
    cout << reversed << '\\n';
}` },
        { walkthrough: "Split into words, update the count for each word in a list of word-count pairs, and preserve first-seen order.", code: `#include <iostream>
#include <sstream>
#include <vector>
using namespace std;
int main() {
    string text = "This this is is done by Saket Saket is Saket", word;
    vector<string> words; vector<int> counts; istringstream input(text);
    while (input >> word) {
        int i = 0; while (i < (int)words.size() && words[i] != word) i++;
        if (i == (int)words.size()) { words.push_back(word); counts.push_back(0); }
        counts[i]++;
    }
    cout << '{'; bool first = true;
    for (int i = 0; i < (int)words.size(); i++) { if (!first) cout << ", "; cout << words[i] << '=' << counts[i]; first = false; }
    cout << "}\\n";
}` },
        { walkthrough: "Compare each number with its successor; the first gap larger than one identifies the missing value.", code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums{1, 2, 3, 4, 6, 7, 8};
    for (int i = 0; i + 1 < (int)nums.size(); i++)
        if (nums[i + 1] - nums[i] != 1) { cout << nums[i] + 1 << '\\n'; break; }
}` },
        { walkthrough: "Place each character in an output string at its destination index, then print the completed string.", code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() {
    string text = "codeleet", result(text.size(), ' ');
    vector<int> indices{4, 5, 6, 7, 0, 2, 1, 3};
    for (int i = 0; i < (int)text.size(); i++) result[indices[i]] = text[i];
    cout << result << '\\n';
}` },
        { walkthrough: "Find each word's first and last character, swap them, and leave the spaces between words intact.", code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;
int main() {
    string text = "hello world Java";
    for (int start = 0; start < (int)text.size();) {
        int end = text.find(' ', start);
        if (end == string::npos) end = text.size();
        if (end - start > 1) swap(text[start], text[end - 1]);
        start = end + 1;
    }
    cout << text << '\\n';
}` },
        { walkthrough: "Capitalize the first character and each character after a space, preserving all other characters.", code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;
int main() {
    string text = "java programming is fun";
    for (int i = 0; i < (int)text.size(); i++)
        if (i == 0 || text[i - 1] == ' ') text[i] = (char)toupper((unsigned char)text[i]);
    cout << text << '\\n';
}` }
    ]
};
