/**
 * Interface for location data associated with a postcode.
 */
export default interface PostcodeLocationData {
  readonly source: URL;
  readonly postcode: string;
  readonly parliamentaryConstituency: string;
  readonly district: string;
  readonly ward: string;
}
