import { PAGINATION_LIMIT, PAGINATION_MIN_PAGE } from "~config/pagination";

export function paginateOptions(queryPage?: string) {
  const page = queryPage ? Number(queryPage) : PAGINATION_MIN_PAGE;
  return { page, limit: PAGINATION_LIMIT };
}
