/**
 * Telephone Number Validator
* Return true if the passed string looks like a valid US phone number.

* The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers :

* 555-555-5555
* (555)555-5555
* (555) 555-5555
* 555 555 5555
* 5555555555
* 1 555 555 5555
* For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.
 */

function telephoneCheck(str) {
    const regex = new RegExp(/^(1?)(?:((\s?\(\d{3}\)\s?|\s?\d{3}\s?)\-?\d{3}\s?\-?\d{4}$))/gm)
    /**
     * /
* ^(1)(?:((\s\(\d\)\s|\s\d\s)\-\d\s\-\d$))
* /
* gm
* ^ asserts position at start of a line
* 1st Capturing Group (1)
* 1 matches the character 1 literally (case sensitive)
* ? matches the previous token between zero and one times, as many times as possible, giving back as needed (greedy)
* Non-capturing group (?:((\s\(\d\)\s|\s\d\s)\-\d\s\-\d$))
* 2nd Capturing Group ((\s\(\d\)\s|\s\d\s)\-\d\s\-\d$)
* 3rd Capturing Group (\s\(\d\)\s|\s\d\s)
* 1st Alternative \s\(\d\)\s
* \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
* ? matches the previous token between zero and one times, as many times as possible, giving back as needed (greedy)
* \( matches the character ( literally (case sensitive)
* \d matches a digit (equivalent to [0-9])
* \) matches the character ) literally (case sensitive)
* \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
* 2nd Alternative \s\d\s
* \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
* \d matches a digit (equivalent to [0-9])
* \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
* \- matches the character - literally (case sensitive)
* ? matches the previous token between zero and one times, as many times as possible, giving back as needed (greedy)
* \d matches a digit (equivalent to [0-9])
* {3} matches the previous token exactly 3 times
* \s matches any whitespace character (equivalent to [\r\n\t\f\v ])
* \- matches the character - literally (case sensitive)
* \d matches a digit (equivalent to [0-9])
* $ asserts position at the end of a line
* Global pattern flags
* g modifier: global. All matches (don't return after first match)
* m modifier: multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
     */
    return regex.test(str)
  
  }

  //test cases   

  telephoneCheck("555-555-5555") // should return a boolean.

// Passed
telephoneCheck("1 555-555-5555") // should return true.

// Passed
telephoneCheck("1 (555) 555-5555") // should return true.

// Passed
// telephoneCheck("5555555555") // should return true.

// Passed
// telephoneCheck("555-555-5555") // should return true.

// Passed
// telephoneCheck("(555)555-5555") // should return true.

// Passed
// telephoneCheck("1(555)555-5555") // should return true.

// Passed
// telephoneCheck("555-5555") // should return false.

// Passed
// telephoneCheck("5555555") // should return false.

// Passed
// telephoneCheck("1 555)555-5555") // should return false.

// Passed
// telephoneCheck("1 555 555 5555") // should return true.

// Passed
// telephoneCheck("1 456 789 4444") // should return true.

// Passed
// telephoneCheck("123**&!!asdf#") // should return false.

// Passed
// telephoneCheck("55555555") // should return false.

// Passed
// telephoneCheck("(6054756961)") // should return false.

// Passed
// telephoneCheck("2 (757) 622-7382") // should return false.

// Passed
// telephoneCheck("0 (757) 622-7382") // should return false.

// Passed
// telephoneCheck("-1 (757) 622-7382") // should return false.

// Passed
// telephoneCheck("2 757 622-7382") // should return false.

// Passed
// telephoneCheck("10 (757) 622-7382") // should return false.

// Passed
// telephoneCheck("27576227382") // should return false.

// Passed
// telephoneCheck("(275)76227382") // should return false.

// Passed
// telephoneCheck("2(757)6227382") // should return false.

// Passed
// telephoneCheck("2(757)622-7382") // should return false.

// Passed
// telephoneCheck("555)-555-5555") // should return false.

// Passed
// telephoneCheck("(555-555-5555") // should return false.

// Passed
// telephoneCheck("(555)5(55?)-5555") // should return false.

// Passed
// telephoneCheck("55 55-55-555-5") // should return false.
