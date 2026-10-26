# HerCare Plus — Database Schema

## medical_records
Stores metadata for medical documents. File contents are stored separately
in the Supabase Storage bucket `medical-records`.

- `id`: UUID primary key
- `owner_id`: authenticated owner's identifier
- `file_name`: display filename
- `storage_path`: unique object-storage path
- `category`: prescription, lab_report, medical_report, or other
- `content_type`: permitted document MIME type
- `file_size`: file size in bytes, limited to 10 MiB
- `version_number`: version sequence
- `previous_version_id`: optional reference to a previous record
- `retention_until`: optional retention deadline
- `created_at`: creation timestamp

## medical_record_audit_logs
Stores upload, download, and delete audit events.

- `id`: UUID primary key
- `actor_id`: identifier of the actor
- `action`: upload, download, or delete
- `record_id`: related medical-record UUID
- `created_at`: event timestamp

## Security and deployment
- API routes must authenticate users and scope queries to the authenticated owner.
- Keep the Supabase service-role secret server-side.
- Keep medical-record storage private.
- Configure and verify appropriate Row Level Security policies.
- Audit events currently use a separate database operation and are not atomic
  with the associated storage or metadata operation.
- This migration is a proposal, not confirmation of the live schema.
  Inspect and reconcile existing tables and the actual `owner_id` type before
  applying it. `CREATE TABLE IF NOT EXISTS` does not alter existing tables.
- This migration does not create the Storage bucket or configure RLS policies.
