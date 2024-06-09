import type Postcode from "@/models/Postcode";
import type PostcodeLocationData from "@/types/PostcodeLocationData";

/**
 * Interface for a service that provides data about a postcode.
 */
export default interface PostcodeLookupService {

  /**
   * Get postcode location data.
   * @param postcode Postcode object.
   * @returns PostcodeLocationData object or null if not found.
   */
  getPostcodeLocationData(postcode: Postcode): Promise<PostcodeLocationData|null>;
}