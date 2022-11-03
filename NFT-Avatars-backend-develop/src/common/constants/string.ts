export const NOT_FOUND = "Data Not Found In Database";
export const NOT_SYNCED =
  "Data outdated be synced, please refresh the data before updating";
export const USERNAME_OR_PASSWORD_INCORRECT = "Username or password Incorrect";
export const EXISTS = "Exists";
export const SHOWN_INTEREST_TO_PROJECT_EARLIER = "Shown Interest To The Project Earlier"
export const EXISTS_ALREADY = (param) => `Exists. ${param}`
export const LINK_NOT_AVAILABLE = "Link Not Available";
export const UNKNOWN_PARAM = (param) => `Unknown Param ${param}`;
export const PARAM_NOT_PROVIDED = (param) => `Parameter ${param} not found`;
export const INVALID_VALUE = (param, value) =>
  `Parameter ${param} cannot be ${value}`;
export const MAX_FILE_LIMIT = 20;
export const PAGE_NOT_FOUND_404 = "Page not found.404 Error.";
export const ONLY_FOR_SPONSOR = "Authorization for only Sponsor.";
export const ONLY_FOR_SME = "Authorization for only Sme.";
export const ONLY_FOR_ADMIN = "Authorization only for Admin.";
export const TOKENS_REQUIRED_VALUE_ERROR =
  "The value of tokens required field must be equal to equivalent bid points field";
export const TOKENS_FOR_SUBMISSION_ERROR =
  "Tokens for submission must be equal to tokens required set by Admin/ProjectOwner";
export const EMAIL_NOT_FOUND = "Email not found";
export const OTP_ERROR = "Otp incorrect";
export const OTP_NOT_EXPIRED = (param) => `Otp not expired ${param}`;
export const OTP_TIME_OUT = "Otp verification window (50 minutes) time out";
export const NEW_PASSWORD_AND_CONFIRM_NEW_PASSWORD_ERROR =
  "New password and confirm new password are not matching";
export const CURRENT_PASSWORD_AND_NEW_PASSWORD_ERROR =
  "Current Password/New Password values are incorrect";
export const TOKEN_ALREADY_USED =
  "Token already used and new password is set with the token";
export const EMAIL_ERROR = "Otp does not exist";
export const CAN_BOOKMARK_CREATED_PROJECTS =
  "Can bookmark only projects created by user";
export const PROJECT_FINALIZE_BID_ONLY_FOR_APPROVED_STATUS =
  "Project status for finalize Bid should be only APPROVED.PENDING, DOCUMENTS_REQUIRED, FUNDED, COMPLETED, REJECTED status are not possible";
export const ONLY_FOR_APPROVED_PROJECTS =
  "Only approved projects can be bidded or updated.";
export const NO_FUNDED_BIDS = "No funded bids for the user";
export const NO_BIDS_APPROVED =
  "Atleast one bid must be have status = 1(Approved) by Admin for finalizing bid/Funding Project ";
export const NO_BIDS_FOR_PROJECT_YET =
  "No bidding has happened for the project yet.";
export const BID_STATUS_ERROR =
  "Bid status has to be one of the below: REJECTED = 2,PENDING = 0,APPROVED = 1";
export const TOKENS_REQUIRED_FIELD_NULL =
  "Tokens required must not be null before Project status is changed to Approved.";
export const PROJECT_EDIT_ERROR =
  "If the project is APPROVED, FUNDED, COMPLETED, only milestone details and documents submission can be editable.All other fields are freezed.";
export const PROJECT_APPROVED_STATUS_CHANGE_ERROR =
  "Approved -> Funded is the only possible state change.From approved status, once the project is funded by a sponsor. The status of the project will be changed to Funded.Or it remains in Approved state only.";
export const PROJECT_FUNDED_STATUS_CHANGE_PENDING_ERROR = "Project Status Cannot to Changed To Pending Once Funded!"
export const PROJECT_FUNDED_STATUS_CHANGE_REJECTED_ERROR = "Project Cannot be Rejected Once Funded"
export const PROJECT_FUNDED_STATUS_CHANGE_DOCUMENTS_REQUIRED_ERROR = "Project Status cannot be Changed To Projects Doc Required Once Funded"
export const PROJECT_FUNDED_STATUS_CHANGE_ERROR =
  "Funded -> Completed is the only possible state change.Once the project is completed and if the repayment is successful by the SME, the status of the project is Completed.Else it remains in the Funded state.";
export const PROJECT_COMPLETED_STATUS_CHANGE_ERROR =
  "Once the project is completed, the status of the project is Completed and this is one of the final states of the project.";
export const PROJECT_PENDING_TO_FUNDED_ERROR = "Project Status cannot be changed to Funded"
  export const PROJECT_PENDING_STATUS_CHANGE_ERROR =
  "Pending -> Approved or Pending -> Rejected or Pending -> DOCUMENTSREQUIRED status change are only possible.";
export const PROJECT_REJECTED_STATUS_CHANGE_ERROR =
  "Once the project is rejected, it cannot be changed to anything-Pending or Approved.";
export const PROJECT_DOCUMENTS_REQUIRED_STATUS_CHANGE_ERROR =
  "DOCUMENTSREQUIRED -> Pending or DOCUMENTSREQUIRED -> Approved or DOCUMENTSREQUIRED -> Rejected status change are only possible.";
export const ONLY_FOR_CREATED_BY_SME_OR_ADMIN =
  "Only editable by Admin or Sme who created the project.";
export const PROJECT_APPROVED_STATUS_CHANGE_ERROR1 =
  "Status change from Approved to Funded is system task.It cannot be done manually even by Admin.Its triggered on clicking Finalize Bid button for particular project.";
export const FUNDS_REQUESTED_ERROR =
  "The funds requested must always be less than the project value.";
  export const FINANCING_AMOUNT_ERROR =
  "The financing amount must always be less than the funds requested.";
  export const WALLET_BALANCE_FINANCING_AMOUNT_ERROR = "The wallet balance is less than the financing amount."
export const CANNOT_DELETE_FUNDED_PROJECTS =
  "Funded projects cannot be deleted.";
export const KYC_PENDING_STATUS_CHANGE_ERROR =
  "Pending -> Approved or Pending -> Rejected status change are only possible.";
export const KYC_APPROVED_STATUS_CHANGE_ERROR =
  "Once the KYC is marked as Approved,it cannot be changed to Pending/Rejected. This is one of the final states of the KYC Verification process.";
export const KYC_REJECTED_STATUS_CHANGE_ERROR =
  "Once the KYC is rejected, it cannot be changed to anything-Pending or Approved.";
export const USER_ACTIVE_STATUS_CHANGE_ERROR =
  "ACTIVE -> IN_REVIEW ,ACTIVE -> CLOSED,ACTIVE -> KYC_INCOMPLETE status change are only possible.";
export const USER_CLOSED_STATUS_CHANGE_ERROR =
  "Once the User status is Closed, it cannot be changed to anything- IN_REVIEW , IN_REVIEW or ACTIVE or KYC_INCOMPLETE";
export const USER_IN_REVIEW_STATUS_CHANGE_ERROR =
  "IN_REVIEW -> ACTIVE,IN_REVIEW -> CLOSED,IN_REVIEW -> KYC_INCOMPLETE status change are only possible.";
export const USER_KYC_INCOMPLETE_STATUS_CHANGE_ERROR =
  "KYC_INCOMPLETE -> ACTIVE,KYC_INCOMPLETE -> CLOSED, KYC_INCOMPLETE -> IN_REVIEW status change are only possible.";
export const PROJECT_PENDING_STATUS_CHANGE_ERROR_SME_KYC_NOT_APPROVED =
  "For SME, their project cannot be approved if Sme's KYC verification is Pending/Rejected.";
export const USER_PREFERENCES_NOT_FILLED =
  "User preferences - Project Type Preference, Practice Area Preference, Preferred Investment Range, Timeline Preference, all the four fields must be filled in User Profile to view recommended projects.";
export const BID_CREATION_ERROR_SPONSOR_KYC_NOT_APPROVED =
  "For Sponsor, their bid cannot be created if Sponsor's KYC verification is Pending/Rejected.";
export const KYC_PENDING_STATUS_CHANGE_ERROR_WITH_ONBOARDING_FALSE = "Cannot change KYC_VERIFICATION_STATUS to APPROVED when Onboarding is false. All documents submitted will set Onboarding to true."
export const TRANSACTION_FOR_PROJECT_EXISTS = "A transaction for the project is already created."
export const ONLY_FOR_FUNDED_PROJECTS_BIDS_APPROVED = "Only funded projects can be added for transactions. Atleast one bid must be have status = 1(Approved) by Admin for Funding Project flow."
export const BID_EDIT_ERROR_AFTER_APPROVAL = "If the bid is APPROVED, all other fields are freezed. Cannot update bid details once APPROVED"
export const BLOCKED_ACCOUNT_ERROR = (param) => `Your account ${param} is added to blocked list. Kindly, contact the Admin to unblock your account for registration.`
export const BIGCHAIN_SERVER_IS_DOWN = "The big chain server is down. Admin will not be able to approve the Users/ Projects/ Bids."
