import type Postcode from "@/models/Postcode";
import type PostcodeLocationData from "@/types/PostcodeLocationData";
import type PostcodeLookup from "@/types/PostcodeLookupService";
import axios from 'axios';

const BASEURL = "https://api.postcodes.io/postcodes/";

interface PostcodesIoData {
  readonly result: {
    readonly postcode: string,
    readonly parliamentary_constituency: string|null,
    readonly admin_district: string|null,
    readonly admin_ward: string|null,
  },
}

/**
 * Postcode lookup service using api.postcodes.io.
 */
export default class PostcodeLookupPostcodesIo implements PostcodeLookup {

  async getPostcodeLocationData(postcode: Postcode): Promise<PostcodeLocationData|null> {
    return await axios.get<PostcodesIoData>(new URL(postcode.value, BASEURL).href)
    .then((response) => {
      return this.mapToPostcodeLocationData(response.data);
    })
    .catch(() => {
      return null;
    });
  }

  private mapToPostcodeLocationData(data: PostcodesIoData): PostcodeLocationData {
    return {
      source: new URL("https://postcodes.io"),
      postcode: data.result.postcode,
      parliamentaryConstituency: data.result.parliamentary_constituency ?? "Unknown",
      district: data.result.admin_district ?? "Unknown",
      ward: data.result.admin_ward ?? "Unknown",
    }
  }
}