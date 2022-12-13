export const OPERATORS = {
  ADDITION: "addition",
  SUBTRACTION: "subtraction",
  MIXED: "mixed"
}

const randomNumber = max => Math.floor(Math.random() * max)

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomNumber(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

const getChoices = (result, max) => {
  const choices = [result]
  while (choices.length < 4) {
    const choice = randomNumber(max)
    if (!choices.includes(choice)) {
      choices.push(choice)
    }
  }
  return shuffle(choices)
}

export const problemTypes = {
  [OPERATORS.ADDITION]: () => {
    return {
      generateProblem: (max) => {
        const a = randomNumber(max)
        const b = randomNumber(max - a)
        return { 
          a, b, 
          choices: getChoices(a + b, max), 
          answer: a + b, 
          question: `${a} + ${b} = `
        }
      }
    }
  },

  [OPERATORS.SUBTRACTION]: () => {
    return {
      generateProblem: (max) => {
        const a = randomNumber(max)
        const b = randomNumber(max - a)
        return { 
          a, b, 
          choices: getChoices(a > b ? a - b : b - a, max), 
          answer: a > b ? a - b : b - a, 
          question: a > b ? `${a} - ${b} = ` : `${b} - ${a} = `
        }
      }
    }
  }
}

problemTypes[OPERATORS.MIXED] = () => {
  const operator = Math.random() < 0.5 ? OPERATORS.SUBTRACTION : OPERATORS.ADDITION;
  const operation = problemTypes[operator]()
  return {
    generateProblem: operation.generateProblem
  }
}

export default problemTypes
