const { supabase } = require('../config/db.config');

// Note model for Supabase
const Note = {
  // Get all notes
  findAll: async (options = {}) => {
    let query = supabase.from('notes').select('*');

    // Handle ordering
    if (options.order && options.order.length > 0) {
      const [field, direction] = options.order[0];
      query = query.order(field, { ascending: direction === 'ASC' });
    } else {
      // Default ordering by createdAt DESC
      query = query.order('createdAt', { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform to match Sequelize format
    return data.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      tags: note.tags || [],
      createdAt: note.createdAt,
      updatedAt: note.updated_at
    }));
  },

  // Find note by primary key (id)
  findByPk: async (id) => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }

    if (!data) return null;

    // Transform to match Sequelize format
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      createdAt: data.createdAt,
      updatedAt: data.updated_at,
      // Add save and destroy methods to mimic Sequelize instance methods
      save: async () => {
        const { data: updatedData, error: updateError } = await supabase
          .from('notes')
          .update({
            title: data.title,
            content: data.content,
            tags: data.tags || [],
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id)
          .select()
          .single();

        if (updateError) throw updateError;
        return updatedData;
      },
      destroy: async () => {
        const { error: deleteError } = await supabase
          .from('notes')
          .delete()
          .eq('id', data.id);

        if (deleteError) throw deleteError;
        return true;
      }
    };
  },

  // Create a new note
  create: async (noteData) => {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('notes')
      .insert({
        title: noteData.title,
        content: noteData.content,
        tags: noteData.tags || [],
        createdAt: now,
        updated_at: now
      })
      .select()
      .single();

    if (error) throw error;

    // Transform to match Sequelize format
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      createdAt: data.createdAt,
      updatedAt: data.updated_at
    };
  }
};

module.exports = Note;
