import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Polyfill __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase credentials in .env.local');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function migrateSections() {
  const dataPath = path.join(__dirname, 'data.json');
  const file = await fs.readFile(dataPath, 'utf-8');
  const sections = JSON.parse(file);

  for (const section of sections) {
    const { error } = await supabase
      .from('sections')
      .upsert({ ...section });
    if (error) {
      console.error('Error upserting section:', section, error);
    }
  }
  console.log('Migration complete!');
}

migrateSections().catch(console.error);
