export const required = value => !value ? "This field is required" : undefined;

export const valueBetween = (min, max) => value => value >= min && value <= max ? undefined : `Value must be between ${min} and ${max}`;