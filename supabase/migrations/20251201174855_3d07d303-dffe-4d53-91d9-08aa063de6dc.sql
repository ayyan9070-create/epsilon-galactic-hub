-- Add new columns to registrations table
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS team_id TEXT,
ADD COLUMN IF NOT EXISTS team_name TEXT,
ADD COLUMN IF NOT EXISTS team_leader_contact TEXT,
ADD COLUMN IF NOT EXISTS team_leader_institute TEXT,
ADD COLUMN IF NOT EXISTS members JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS modules_selected JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS brand_ambassador TEXT,
ADD COLUMN IF NOT EXISTS payment_proof_url TEXT,
ADD COLUMN IF NOT EXISTS total_fee INTEGER,
ADD COLUMN IF NOT EXISTS payment_verified BOOLEAN DEFAULT false;

-- Update status field to use proper enum values
ALTER TABLE registrations 
ALTER COLUMN status SET DEFAULT 'pending';

-- Add status column to brand_ambassador_applications if not exists
ALTER TABLE brand_ambassador_applications 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for payment proofs
CREATE POLICY "Users can upload their own payment proofs"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'payment-proofs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own payment proofs"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'payment-proofs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all payment proofs"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'payment-proofs' AND
  has_role(auth.uid(), 'admin'::app_role)
);