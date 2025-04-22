import { supabase } from './client';

export async function fetchSections() {
  const { data, error } = await supabase.from('sections').select('*').order('id');
  if (error) throw error;
  return data;
}

export async function fetchProjects() {
  const { data, error } = await supabase.from('projects').select('*').order('id');
  if (error) throw error;
  return data;
}

export async function fetchTeamMembers() {
  const { data, error } = await supabase.from('team_members').select('*').order('id');
  if (error) throw error;
  return data;
}
