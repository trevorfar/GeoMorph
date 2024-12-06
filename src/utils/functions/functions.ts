import words from "@/app/words";

export function validateSubmitInput( currentGuess: string[], previousGuess: string[], numLetters: number): boolean{
  if (
    validateInput(currentGuess) &&
    containsTwoLetters(previousGuess, currentGuess, numLetters) &&
    checkValidWord(currentGuess.join("")) 
  ) {
    return true
  }
  return false
}

export function getRandomWord(words: string[]): { word: string, updatedWords: string[] } {
  if (words.length === 0) {
    throw new Error("No words left to select.");
  }
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    return {
      word,
      updatedWords: words.filter((_, index) => index !== randomIndex),
    };
  }

export function containsTwoLetters(inp1: string[], inp2: string[], numLetters: number): boolean {
    let count = 0;
    if (
      inp1.length !== numLetters ||
      inp2.length !== numLetters ||
      inp1.some((el) => typeof el !== "string") ||
      inp2.some((el) => typeof el !== "string")
    ) {
      return false;
    }
  
    if(inp1.every(element => element === "")){
      return true;
    }
  
    for (let i = 0; i < numLetters; i++){
      if(inp1[i].toLowerCase() === inp2[i].toLowerCase()){
        count++;
      }
      if(count >= 2){
        return true;
      }
    }
    return false;
  }

  
  export function checkValidWord(input: string): boolean{
    if (!input.trim()) {
        console.log("Input cannot be empty.");
        return false;
    }
    if(words.includes(input.toLowerCase())){
        return true;
    }else {
        return false;
    }

//     try {
//       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.toLowerCase()}`);
//       if (response.ok) {
//           const data = await response.json();
//           if (data && data.length > 0) {
//             return true
//           } else {
//               console.log("The word is not found in the dictionary.");
//               return false
//           }
//       } else {
//           console.log("Invalid word or unable to fetch data.");
//           return false
//       }
//   } catch (error) {
//       console.log("An error occurred while checking the word.");
//       return false
//   }
  }
  
export function validateInput(input: string[]):boolean {
    
      return input.every((el) => typeof el === "string" && el != "");
  }
  
  
  