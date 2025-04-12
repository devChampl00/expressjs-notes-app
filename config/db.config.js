const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create a Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
const connectDB = async () => {
  try {
    const { data, error } = await supabase.from('health_check').select('*').limit(1);
    
    if (error) {
      throw new Error(`Supabase connection error: ${error.message}`);
    }
    
    console.log('Supabase connection established successfully');
  } catch (error) {
    console.error('Unable to connect to Supabase:', error.message);
    console.log('Note: You may need to create a health_check table in your Supabase database');
    // Don't exit process as the table might not exist yet
  }
};

module.exports = { connectDB, supabase };
