Medical Records Vault — API Documentation



Overview



The Medical Records Vault manages private medical documents using authenticated API routes and private Supabase Storage.



Base path: "/api/medical-records"



Authentication and authorization



All endpoints require an authenticated NextAuth session. The server derives the user's identity from the session and restricts record access to the authenticated owner.



Never trust a user-supplied owner ID. Never expose Supabase secret keys or private storage credentials to the browser.



Supported file uploads



\- PDF ("application/pdf")

\- JPEG ("image/jpeg")

\- PNG ("image/png")

\- Maximum file size: 10 MB

\- The server validates the declared MIME type and file signature.

\- Files are stored in a private Supabase Storage bucket.



These checks do not replace malware scanning.



Endpoints



1\. List medical records



"GET /api/medical-records"



Returns records belonging to the authenticated user, subject to the endpoint's result limit.



\- Success: "200 OK"

\- Authentication failure: "401 Unauthorized"



2\. Upload a medical record



"POST /api/medical-records"



Content type: "multipart/form-data"



Required field:



\- "file": the document to upload.



The server validates the file, uploads it to private storage, saves its metadata, and records an audit event.



\- Success: "201 Created"

\- "400 Bad Request": missing or oversized file.

\- "401 Unauthorized": no authenticated session.

\- "415 Unsupported Media Type": unsupported file type or invalid file signature.

\- "502 Bad Gateway": storage or metadata operation failed.



3\. Extract text using OCR



"POST /api/medical-records/ocr"



Content type: "multipart/form-data"



Required field:



\- "file": a JPEG or PNG medical document image.



The endpoint requires an authenticated NextAuth session and accepts images up to 10 MB. It validates the declared MIME type and image signature before processing.



The response contains extracted text marked with "needs\_human\_review". OCR output is unverified and must be checked against the original document by a person before use.



\- Success: "200 OK"

\- "400 Bad Request": missing file or invalid file size.

\- "401 Unauthorized": no authenticated session.

\- "415 Unsupported Media Type": unsupported image type or invalid image signature.

\- "500 Internal Server Error": OCR processing failed.



OCR limitations:



\- English OCR currently supports JPEG and PNG images only.

\- PDF OCR is not implemented.

\- Structured medical-value extraction is not implemented.

\- OCR results are not automatically saved.



4\. Generate a download link



"GET /api/medical-records/download?id={recordId}"



Generates a short-lived signed URL only after checking that the requested record belongs to the authenticated user.



The signed URL expires after 60 seconds.



\- Success: "200 OK"

\- Not found or not owned by the user: "404 Not Found"



Treat signed URLs as sensitive temporary credentials. Do not share or log their values unnecessarily.



5\. Delete a medical record



"DELETE /api/medical-records/delete?id={recordId}"



Deletes a record belonging to the authenticated user and removes its stored file.



Storage deletion and database deletion are separate operations, so partial failures must be handled and documented.



Audit logging



The application records upload, download, and deletion events in the medical-record audit table.



Audit logs should be protected from unauthorized modification. Current application logging should not be described as immutable until database permissions, tamper resistance, and failure handling have been verified.



Privacy and security limitations



The current implementation does not establish that every advanced security requirement is complete.



The following require implementation and verification before they can be considered complete:



\- Malware scanning and quarantine.

\- Structured medical-value extraction and automatic persistence of OCR results.

\- Client-side encryption of uploaded medical documents.

\- Document versioning.

\- Retention and automatic expiry policies.

\- Export and consent-based sharing.

\- Comprehensive cross-account authorization tests.

\- Safe preview controls and content-security protections.



Basic English OCR for JPEG and PNG images is implemented, with mandatory human review.



Testing and verification



Run the automated tests:



"npm.cmd test"



Run the production build:



"npm.cmd run build"



Document the actual results from the latest execution. Do not claim that a requirement is implemented merely because it is listed here.



Data handling



Medical documents contain sensitive personal information. Keep storage private, enforce owner checks on every record operation, use short-lived access links, minimize sensitive logging, and apply an explicit retention and deletion policy.

