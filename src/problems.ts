type Problem = {
    title: string;
    description: string;
    endResult: string;
    startingCode?: string;
};

const problems: Problem[] = [
    {
        title: "Number 22",
        description: "Write out the number 22 as fast as possible",
        endResult: "22",
    },
    {
        title: "Sort this array",
        description: "Sort the [1, 7, 4, 9] in descending order",
        endResult: "9,7,4,1",
        startingCode: "const array = [1, 7, 4, 9]",
    },
    {
        title: "Reverse a string",
        description: "Reverse the string 'hello' so it becomes 'olleh'",
        endResult: "olleh",
        startingCode: "const str = 'hello';",
    },
    {
        title: "Find the maximum number",
        description: "Find the largest number in the array [3, 7, 2, 9, 5]",
        endResult: "9",
        startingCode: "const numbers = [3, 7, 2, 9, 5];",
    },
    {
        title: "Count characters",
        description: "Count how many characters are in the string 'OpenAI'",
        endResult: "6",
        startingCode: "const word = 'OpenAI';",
    },
    {
        title: "Filter even numbers",
        description:
            "Filter out only the even numbers from the array [1, 2, 3, 4, 5, 6]",
        endResult: "2,4,6",
        startingCode: "const numbers = [1, 2, 3, 4, 5, 6];",
    },
    {
        title: "Sum an array",
        description: "Calculate the sum of all numbers in [5, 10, 15]",
        endResult: "30",
        startingCode: "const numbers = [5, 10, 15];",
    },
    {
        title: "Capitalize word",
        description:
            "Capitalize the word 'javascript' so it becomes 'Javascript'",
        endResult: "Javascript",
        startingCode: "const word = 'javascript';",
    },
    {
        title: "Get object property",
        description: "Log the value of the 'age' property from the object",
        endResult: "25",
        startingCode: "const person = { name: 'Alice', age: 25 };",
    },
    {
        title: "Join array into string",
        description: "Turn the array ['a', 'b', 'c'] into the string 'a-b-c'",
        endResult: "a-b-c",
        startingCode: "const letters = ['a', 'b', 'c'];",
    },
];

export const getRandomProblem = (): Problem => {
    const index = Math.floor(Math.random() * problems.length);
    const chosenProblem = problems[index];
    return chosenProblem;
};
