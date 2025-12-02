-- Create brand ambassador applications table (PUBLIC)
CREATE TABLE IF NOT EXISTS public.brand_ambassador_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT NOT NULL,
  phone TEXT NOT NULL,
  cnic TEXT NOT NULL,
  photo_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE TABLE IF NOT EXISTS public.brand_ambassadors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  phone TEXT NOT NULL,
  cnic TEXT NOT NULL, -- <--- 1. Missing comma after this line was the main cause.
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() -- <--- 2. Removed the extra comma here.
);

-- Enable RLS
ALTER TABLE public.brand_ambassador_applications ENABLE ROW LEVEL SECURITY;

-- Public can insert (no auth required for brand ambassador applications)
CREATE POLICY "Anyone can submit brand ambassador application"
ON public.brand_ambassador_applications
FOR INSERT
WITH CHECK (true);

-- Public can view (optional - remove if you want applications private)
CREATE POLICY "Anyone can view brand ambassador applications"
ON public.brand_ambassador_applications
FOR SELECT
USING (true);

-- Admin policies for brand ambassador applications
CREATE POLICY "Admins can view all applications"
ON public.brand_ambassador_applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update brand ambassador applications
CREATE POLICY "Admins can update applications"
ON public.brand_ambassador_applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete applications"
ON public.brand_ambassador_applications
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));


-- Create registrations table (PRIVATE per user)
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  team_leader_name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT NOT NULL,
  team_size INTEGER NOT NULL CHECK (team_size >= 1 AND team_size <= 4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Users can only insert their own registrations
CREATE POLICY "Users can create their own registrations"
ON public.registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only view their own registrations
CREATE POLICY "Users can view their own registrations"
ON public.registrations
FOR SELECT
USING (auth.uid() = user_id);

-- Admin policies for registrations
CREATE POLICY "Admins can view all registrations"
ON public.registrations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update registrations"
ON public.registrations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete registrations"
ON public.registrations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create contacts table (PUBLIC)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form"
ON public.contacts
FOR INSERT
WITH CHECK (true);
