class Data {
  private _hasPassedValidation: boolean;
  private _hasPassedFormat: boolean;
  private _hasPassedSize: boolean;
  private _hasPassedPersonalInfo: boolean;

  constructor(
    hasPassedValidation: boolean,
    hasPassedFormat: boolean,
    hasPassedSize: boolean,
    hasPassedPersonalInfo: boolean
  ) {
    this._hasPassedValidation = hasPassedValidation;
    this._hasPassedFormat = hasPassedFormat;
    this._hasPassedSize = hasPassedSize;
    this._hasPassedPersonalInfo = hasPassedPersonalInfo;
  }

  get hasPassedValidation(): boolean {
    return this._hasPassedValidation;
  }

  get hasPassedFormat(): boolean {
    return this._hasPassedFormat;
  }

  get hasPassedSize(): boolean {
    return this._hasPassedSize;
  }

  get hasPassedPersonalInfo(): boolean {
    return this._hasPassedPersonalInfo;
  }
}

class ProcessingResult {
  private _message: string;
  private _success: boolean;

  constructor(message: string, success: boolean) {
    this._message = message;
    this._success = success;
  }

  get message(): string {
    return this._message;
  }

  get success(): boolean {
    return this._success;
  }
}

interface IChecker {
  setNext(nextChecker: IChecker): IChecker;
  check(data: Data): ProcessingResult;
}

abstract class CheckerBase implements IChecker {
  private nextChecker: IChecker;

  setNext(nextChecker: IChecker): IChecker {
    this.nextChecker = nextChecker;
    return this.nextChecker;
  }

  check(data: Data): ProcessingResult {
    if (this.nextChecker) {
      return this.nextChecker.check(data);
    }
    console.log("All checks passed, processing data...");
    return new ProcessingResult("Data processed successfully", true);
  }
}

class ValidationChecker extends CheckerBase {
  check(data: Data): ProcessingResult {
    if (!data.hasPassedValidation) {
      console.log("Validation check failed...");
      return new ProcessingResult("Data validation failed", false);
    }
    console.log("Data has passed validation checks...");
    return super.check(data);
  }
}

class FormatChecker extends CheckerBase {
  check(data: Data): ProcessingResult {
    if (!data.hasPassedFormat) {
      console.log("Format check failed...");
      return new ProcessingResult("Data is not correctly formatted", false);
    }
    console.log("Data has passed format checks...");
    return super.check(data);
  }
}

class SizeChecker extends CheckerBase {
  check(data: Data): ProcessingResult {
    if (!data.hasPassedSize) {
      console.log("Size check failed...");
      return new ProcessingResult("Data size is invalid", false);
    }
    console.log("Data has passed size checks...");
    return super.check(data);
  }
}

class PersonalInfoChecker extends CheckerBase {
  check(data: Data): ProcessingResult {
    if (!data.hasPassedPersonalInfo) {
      console.log("Personal info check failed...");
      return new ProcessingResult("Personal information check failed", false);
    }
    console.log("Data has passed personal info checks...");
    return super.check(data);
  }
}

const validData = new Data(true, true, true, true);
const invalidData = new Data(true, false, true, true);

const validationChecker = new ValidationChecker();
const formatChecker = new FormatChecker();
const sizeChecker = new SizeChecker();
const personalInfoChecker = new PersonalInfoChecker();

validationChecker
  .setNext(formatChecker)
  .setNext(sizeChecker)
  .setNext(personalInfoChecker);

console.log("Processing valid data:");
const validResult = validationChecker.check(validData);
console.log(validResult.message);
console.log("Success:", validResult.success);

console.log("\n------------------------\n");

console.log("Processing invalid data:");
const invalidResult = validationChecker.check(invalidData);
console.log(invalidResult.message);
console.log("Success:", invalidResult.success);
