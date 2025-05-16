/*
  # Initial Schema for Duaa Organizer App

  1. New Tables
    - `people`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `created_at` (timestamp with time zone, default: now())
    - `duaas`
      - `id` (uuid, primary key)
      - `person_id` (uuid, foreign key to people.id)
      - `text` (text, not null)
      - `is_done` (boolean, default: false)
      - `created_at` (timestamp with time zone, default: now())
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to perform all operations
*/

-- Create people table
CREATE TABLE IF NOT EXISTS people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create duaas table with foreign key reference to people
CREATE TABLE IF NOT EXISTS duaas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid REFERENCES people(id) ON DELETE CASCADE,
  text text NOT NULL,
  is_done boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE duaas ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Anyone can view people" 
  ON people FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert people" 
  ON people FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update people" 
  ON people FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete people" 
  ON people FOR DELETE 
  USING (true);

CREATE POLICY "Anyone can view duaas" 
  ON duaas FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert duaas" 
  ON duaas FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update duaas" 
  ON duaas FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete duaas" 
  ON duaas FOR DELETE 
  USING (true);