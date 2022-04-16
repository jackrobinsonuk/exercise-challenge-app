// This lambda function will update the leagues S3 bucket with the data from the latest week

// Note: this may need doing over multiple functions and use StepFunctons to chain it together

// Find out what week number it is in the challenge
// Get all exercise completed in the week
// Get current league data
// Update current league data with new data from the week
// Re-rank the users based on the league data, ordering by points

// the first user in the rank is added 2 tier points and promoted
// the second user in the rank is added 1 tier point
// the last user in the rank is subtracted 1 tier points and demoted

// the new league data should be saved to the s3 bucket to allow it to be fetched

// Sample League Data (this is what the FE expects) can be found in the FE portion of the repo
// If the service contract cannot be achieved, then the FE UI will need to be redesigned
