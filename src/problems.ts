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
        title: "Get the key",
        description: "Write out the value of key1, as fast as possible",
        endResult: "gz",
        startingCode: `
const object = {
    key2: "not this one",
    key5: "nope",
    key1: "gz",
    key3: "oops"
}`,
    },
];

export const getRandomProblem = (): Problem => {
    const index = Math.floor(Math.random() * problems.length);
    return problems[index];
};
