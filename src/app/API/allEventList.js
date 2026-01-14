'use client';

export const getAllEvents = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `https://dashboard.bluone.ink/api/public/books/search?page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    
    // Extract unique events from the books data
    const uniqueEvents = [...new Set(data.data.map(book => ({
      id: book.event_id,
      name: book.event_name,
      slug: book.event_slug,
      date: book.event_date,
      location: book.event_location,
      description: book.event_description
    })))];

    return {
      events: uniqueEvents,
      total: uniqueEvents.length,
      currentPage: page,
      totalPages: Math.ceil(uniqueEvents.length / limit)
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export default getAllEvents; 