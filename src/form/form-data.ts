/**
 * Recursively appends object values to FormData with key nesting.
 */
export function buildFormData(formData: any, data: any, parentKey?: string) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key: any) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }
}
