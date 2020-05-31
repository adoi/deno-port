function areNumbers(...numbers: Array<number>): boolean {
  return numbers.some((number) => Number.isInteger(number));
}

function areWithinRange(...numbers: Array<number>): boolean {
  return numbers.every(
    (number) => {
      return (number >= 1024 && number <= 65535);
    },
  );
}

export function portRangeValidation(...numbers: Array<number>) {
  const [from, to] = numbers;
  if (
    !areNumbers(...numbers) ||
    !areWithinRange(...numbers) ||
    from > to
  ) {
    throw new Error("Invalid arguments");
  }
}

export function portValidation(number: number) {
  if (!areWithinRange(number)) {
    throw new Error("Invalid arguments");
  }
}
