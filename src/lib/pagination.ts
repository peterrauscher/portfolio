/**
 * Pagination utilities for blog posts and other content collections
 */

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginationResult<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: T[],
  options: PaginationOptions,
): PaginationResult<T> {
  const { page, pageSize } = options;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Validate and normalize page number
 */
export function normalizePage(
  page: number | string | undefined,
  maxPage: number,
): number {
  const normalizedMaxPage = maxPage < 1 ? 1 : maxPage;

  // Page values are integers by domain: search params parse as integers,
  // numeric page counts are already integers; anything unparseable is page 1.
  const parsed = page === undefined ? 1 : parseInt(String(page), 10);

  if (isNaN(parsed) || parsed < 1) return 1;

  return Math.min(parsed, normalizedMaxPage);
}
