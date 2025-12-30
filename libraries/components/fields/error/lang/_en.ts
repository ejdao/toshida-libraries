export const en: any = {
  minLengthMsg: (length: number) => `The field contains fewer than ${length} characters`,
  maxLengthMsg: (length: number) => `The field contains more than ${length} characters`,
  minMsg: (min: number) => `The number must be bigger than ${min}`,
  maxMsg: (max: number) => `The number must be lower than ${max}`,
  patternMsg: 'One or more characters not allowed',
  requiredMsg: 'This field is required',
  EmailMsg: 'This field must be an email',
  onlyNumberMsg: 'This field must be numeric',
  badDateMsg: 'Insert a valid date',
  DateRangeMsg: 'The range is not valid',
};
