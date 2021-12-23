export const STATUS_APPROVED = "approved";
export const STATUS_PENDING = "pending";

export const DOC_TYPE_REQUIREMENTS = "requirements";
export const DOC_TYPE_WIREFRAMES = "wireframes";
export const DOC_TYPE_ESTIMATE = "estimate";
export const DOC_TYPE_PROPOSAL = "proposal";
export const DOC_TYPE_PLANNING = "planning";
export const DOC_TYPE_TIMELINE = "timeline";
export const DOC_TYPE_OTHER = "other";
export const DOC_TYPE_CONTRACT = "contract";

// TODO.....
export const DOCUMENT_TYPES = [
  [DOC_TYPE_REQUIREMENTS, "Requirements"],
  [DOC_TYPE_WIREFRAMES, "Wireframes"],
  [DOC_TYPE_ESTIMATE, "Estimate"],
  [DOC_TYPE_PROPOSAL, "Proposal"],
  [DOC_TYPE_PLANNING, "Planning"],
  [DOC_TYPE_TIMELINE, "Timeline"],
  [DOC_TYPE_OTHER, "Other"],
  [DOC_TYPE_CONTRACT, "Contracts"],
];

let docTypesMap = {};
DOCUMENT_TYPES.map((doc) => {
  docTypesMap[doc[0]] = doc[1];
});

export const DOCUMENT_TYPES_MAP = docTypesMap;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
