-- Create teams table
create table if not exists teams (
  id uuid default gen_random_uuid() primary key,
  team_id varchar(6) not null unique, -- 6-digit team id (string to preserve leading zeros)
  team_name text not null,
  leader_name text not null,
  leader_email text not null,
  leader_contact text,
  leader_institute text,
  brand_ambassador_id uuid, -- fk to brand_ambassadors table (optional)
  status text default 'pending', -- pending, paid, confirmed, rejected
  total_fee numeric default 0,
  created_at timestamptz default now()
);

-- Create team_members table
create table if not exists team_members (
  id uuid default gen_random_uuid() primary key,
  team_id uuid references teams(id) on delete cascade,
  name text not null,
  email text,
  contact text,
  institute text,
  is_leader boolean default false
);

-- Create modules selection table (to record selections)
create table if not exists team_selections (
  id uuid default gen_random_uuid() primary key,
  team_id uuid references teams(id) on delete cascade,
  module_category text not null, -- 'general' or 'stem'
  module_name text not null
);

-- Create brand ambassadors table (all BAs)
create table if not exists brand_ambassadors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  contact text,
  approved boolean default false, -- admin toggles this
  created_at timestamptz default now()
);

-- Create approved_ba table (optional mirror for quick dropdown)
create table if not exists approved_brand_ambassadors as
select * from brand_ambassadors where false;

-- Payment proofs table
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  team_id uuid references teams(id) on delete cascade,
  uploader uuid, -- auth.uid who uploaded
  receipt_url text, -- storage path
  amount numeric,
  uploaded_at timestamptz default now(),
  verified boolean default false,
  verified_by uuid,
  verified_at timestamptz
);

-- Indexes for quick lookups
create unique index if not exists idx_team_teamid on teams(team_id);
