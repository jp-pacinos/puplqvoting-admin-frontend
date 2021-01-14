export const RequestStatus = {
  idle: 'idle' as const,
  pending: 'pending' as const,
  success: 'success' as const,
  failure: 'failure' as const,
  validating: 'validating' as const,
}

export const Duration = {
  infinite: 0,
  veryShort: 1500,
  short: 3500,
  long: 10000,
}

export const ErrorMessage = {
  rejected: 'Rejected',
  axiosAbort: 'AbortError',
  unknown: 'Something went wrong. Please refresh the page and try again.',
}
