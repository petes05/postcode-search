import { PostcodeRegex } from "@/assets/regex";

/**
 * Represents a validated postcode.
 */
export default class Postcode {
  readonly value: string;

  private constructor(postcode: string) {
    this.value = postcode;
  }

  /**
   * Create a new postcode object.
   * @param postcode
   * @returns Newly created postcode object or null if invalid postcode provided.
   */
  public static createPostcodeObject(postcode: string): Postcode|null {
    const valid = this.validatePostcodeString(postcode);
    
    return valid ? new Postcode(postcode) : null;
  }

  private static validatePostcodeString(postcode: string): boolean {
    return PostcodeRegex.test(postcode.toUpperCase());
  }
}