import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "uploads";

// Supabase Storage rejects object keys containing accented letters or other
// non-ASCII characters (400 InvalidKey). Strip accents and replace anything
// outside a safe charset, while the original fileName is kept separately
// (in the DB) for display purposes.
function sanitizeForStorageKey(fileName: string): string {
  const normalized = fileName?.normalize?.("NFD")?.replace?.(/[̀-ͯ]/g, "") ?? fileName;
  return normalized.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function generatePresignedUploadUrl(
  fileName: string,
  contentType: string,
  isPublic: boolean = false
): Promise<{ uploadUrl: string; cloudStoragePath: string }> {
  const prefix = isPublic ? "public" : "private";
  const cloudStoragePath = `${prefix}/${Date.now()}-${sanitizeForStorageKey(fileName)}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(cloudStoragePath);

  if (error) throw error;

  const url = new URL(data.signedUrl);
  url.searchParams.set("x-upsert", "true");

  return { uploadUrl: url.toString(), cloudStoragePath };
}

export function getPublicUrl(cloudStoragePath: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(cloudStoragePath);
  return data.publicUrl;
}

export async function createSignedUrl(
  cloudStoragePath: string,
  expiresIn: number = 3600
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(cloudStoragePath, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}

export async function deleteFile(cloudStoragePath: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([cloudStoragePath]);
  if (error) throw error;
}
