// Define the overall structure for the Google Custom Search JSON response
export interface GoogleCustomSearchResponse {
  kind: string;
  url: URL;
  queries: Queries;
  context: Context;
  searchInformation: SearchInformation;
  items: SearchResultItem[];
}

// Define the structure for the URL object
interface URL {
  type: string;
  template: string;
}

// Define the structure for the Queries object
interface Queries {
  request: Request[];
}

// Define the structure for the Request object
interface Request {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
}

// Define the structure for the Context object
interface Context {
  title: string;
}

// Define the structure for the SearchInformation object
interface SearchInformation {
  searchTime: number;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}

// Define the structure for each SearchResultItem
interface SearchResultItem {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap: PageMap;
}

// Define the structure for the PageMap object
interface PageMap {
  cse_thumbnail?: Thumbnail[];
  metatags?: MetaTag[];
  cse_image?: Image[];
  listitem?: ListItem[];
  offer?: Offer[];
  product?: Product[];
  aggregaterating?: AggregateRating[];
  brand?: Brand[];
  hproduct?: HProduct[];
}

// Define the structure for the Thumbnail object
interface Thumbnail {
  src: string;
  width: string;
  height: string;
}

// Define the structure for the MetaTag object
interface MetaTag {
  [key: string]: string;
}

// Define the structure for the Image object
interface Image {
  src: string;
}

// Define the structure for the ListItem object
interface ListItem {
  item: string;
  name: string;
  position: string;
}

// Define the structure for the Offer object
interface Offer {
  pricecurrency: string;
  price: string;
  url: string;
}

// Define the structure for the Product object
interface Product {
  image: string;
  name: string;
  availability: string;
  sku: string;
  url: string;
}

// Define the structure for the AggregateRating object
interface AggregateRating {
  ratingvalue: string;
  ratingcount: string;
  worstrating: string;
  bestrating: string;
}

// Define the structure for the Brand object
interface Brand {
  name: string;
}

// Define the structure for the HProduct object
interface HProduct {
  fn: string;
  photo: string;
  currency: string;
  currency_iso4217: string;
  url: string;
}
