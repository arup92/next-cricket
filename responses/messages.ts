export enum ErrorMessage {
    INV_CREDENTIALS = 'Invalid Credentials.',
    INV_EMAIL_VERIFY_TOKEN = 'Invalid or expired verification token.',
    INT_SERVER_ERROR = 'Invalid Server Error.',
    EMAIL_NOT_ACTIVE = 'Email not verified! Please check your email verify.',
    EMAIL_EXISTS = 'Email already exists',
    ALREADY_VERIFIED = 'Email Already Verified.',
    UNAUTHENTICATED = 'Authentication required!',
    BAD_REQUEST = 'Bad Request',
    INV_VENUE = 'Invalid Venue',
    SOMETHING_WRONG = 'Something wrong occured! Please try again later.',
    MATCH_EXISTS = 'Match already exists',
    DATA_EXISTS = 'Data already exists',
    INV_SESSION_ENTRY = 'Invalid Session Entry'
}

export enum Message {
    SUCESS_EMAIL_VERIFIED = 'Your email address is verified successfully! Please log in to your account.',
    SUCESS_EMAIL_SENT = 'Email verification link has been sent. Please check your email inbox and follow the instructions to verify your email address.',
    SUCCESS_REGISTERED = 'Registered successfully! Please verify your email address.',
    MATCH_ADDED = "Match Added",
    TEAM_ADDED = "Team Added",
    UPDATED = "Updated successfully"
}