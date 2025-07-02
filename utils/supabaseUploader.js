const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET } =
  process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function uploadToSupabase(file) {
  // file: hasil dari multer (buffer, originalname, mimetype)
  const fileExt = file.originalname.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });
  if (error) throw error;
  // Dapatkan public URL
  const { data: publicUrlData } = supabase.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(fileName);
  return {
    publicUrl: publicUrlData.publicUrl,
    filename: fileName,
  };
}

module.exports = uploadToSupabase;
